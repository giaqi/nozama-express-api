'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Purchase = models.purchase

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Purchase.find({_owner: req.user._id})
    .then(purchases => res.json({
      purchases: purchases.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    purchase: req.purchase.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const purchase = Object.assign(req.body, {
    _owner: req.user._id,
    totalPrice: req.user.cartItemPrice,
    totalItems: req.user.cartItemTotal,
    products: req.user.cart
  })

  // check if everything in array is truthy
  if (Object.keys(purchase).every(key => !!purchase[key])) {
    Purchase.create(purchase)
      .then(purchase =>
        res.status(201)
          .json({
            purchase: purchase.toJSON({ virtuals: true, user: req.user })
          }))
      .then(() => {
        req.user.cart = []
        req.user.save()
      })
      .catch(next)
  } else {
    res.sendStatus(400)
  }
}

module.exports = controller({
  index,
  show,
  create
}, { before: [
  { method: setUser, only: ['index', 'show', 'create'] },
  { method: authenticate },
  { method: setModel(Purchase), only: ['show'] }
] })
