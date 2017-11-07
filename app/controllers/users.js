'use strict'

const debug = require('debug')('nozama-express-api:users')

const controller = require('lib/wiring/controller')
const models = require('app/models')
const User = models.user

const crypto = require('crypto')

const authenticate = require('./concerns/authenticate')

const HttpError = require('lib/wiring/errors/http-error')

const MessageVerifier = require('lib/wiring/message-verifier')

const encodeToken = (token) => {
  const mv = new MessageVerifier('secure-token', process.env.SECRET_KEY)
  return mv.generate(token)
}

const getToken = () =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(16, (err, data) =>
      err ? reject(err) : resolve(data.toString('base64'))
    )
  )

const index = (req, res, next) => {
  User.find({})
    .then(users => res.json({ users }))
    .catch(next)
}

const show = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user ? res.json({ user }) : next())
    .catch(next)
}

const makeErrorHandler = (res, next) =>
  error =>
    error && error.name && error.name === 'ValidationError'
      ? res.status(400).json({ error })
    : next(error)

const signup = (req, res, next) => {
  const credentials = req.body.credentials
  const user = { email: credentials.email, password: credentials.password }
  getToken()
    .then(token => {
      user.token = token
    })
    .then(() =>
      new User(user).save())
    .then(user =>
      res.status(201).json({ user }))
    .catch(makeErrorHandler(res, next))
}

const signin = (req, res, next) => {
  const credentials = req.body.credentials
  const search = { email: credentials.email }
  User.findOne(search)
    .then(user =>
      user ? user.comparePassword(credentials.password)
            : Promise.reject(new HttpError(401)))
    .then(user =>
      getToken().then(token => {
        user.token = token
        return user.save()
      }))
    .then(user => {
      user = user.toObject()
      delete user.passwordDigest
      user.token = encodeToken(user.token)
      res.json({ user })
    })
    .catch(makeErrorHandler(res, next))
}

const signout = (req, res, next) => {
  getToken().then(token =>
    User.findOneAndUpdate({
      _id: req.params.id,
      token: req.user.token
    }, {
      token
    })
  ).then((user) =>
    user ? res.sendStatus(204) : next()
  ).catch(next)
}

const changepw = (req, res, next) => {
  debug('Changing password')
  User.findOne({
    _id: req.params.id,
    token: req.user.token
  }).then(user =>
    user ? user.comparePassword(req.body.passwords.old)
      : Promise.reject(new HttpError(404))
  ).then(user => {
    user.password = req.body.passwords.new
    return user.save()
  }).then((/* user */) =>
    res.sendStatus(204)
  ).catch(makeErrorHandler(res, next))
}

const addCartItem = (req, res, next) => {
  if (req.body.product && req.body.qty) {
    User.findOne({
      _id: req.params.id,
      token: req.user.token
    }).then(user => {
      for (let x = 0; x < user.cart.length; x++) {
        if (user.cart[x][0].id === req.body.product.id) {
          user.cart[x][1] = req.body.qty
          return user.save()
        }
      }
      user.cart.push([req.body.product, req.body.qty])
      return user.save()
    }).then((user) =>
      res.json({ cart: user.cart })
    ).catch(makeErrorHandler(res, next))
  } else {
    res.sendStatus(400)
  }
}

const removeCartItem = (req, res, next) => {
  User.findOne({
    _id: req.params.id,
    token: req.user.token
  }).then(user => {
    if (req.query.clear) {
      user.cart = []
      return user.save()
    }
    if (req.body.product) {
      for (let x = 0; x < user.cart.length; x++) {
        if (user.cart[x][0].id === req.body.product.id) {
          user.cart.splice(x, 1)
          return user.save()
        }
      }
    } else {
      return null
    }
  }).then(user => {
    if (user) {
      res.json({ cart: user.cart })
    } else {
      res.sendStatus(400)
    }
  }).catch(makeErrorHandler(res, next))
}

module.exports = controller({
  index,
  show,
  signup,
  signin,
  signout,
  changepw,
  addCartItem,
  removeCartItem
}, { before: [
  { method: authenticate, except: ['signup', 'signin'] }
] })
