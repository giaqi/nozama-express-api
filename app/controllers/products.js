'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Product = models.product

const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  if (req.query.name) {
    console.log(req.query)
    const search = {}
    const key = Object.keys(req.query)[0]
    const value = req.query[key]
    console.log(key)
    search[key] = {$regex: new RegExp(value, 'i')}
    Product.find(search)
      .then(products => res.json({
        products: products.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
      }))
      .catch(next)
  } else {
    Product.find()
      .then(products => res.json({
        products: products.map((e) =>
          e.toJSON({ virtuals: true, user: req.user }))
      }))
      .catch(next)
  }
}

const show = (req, res) => {
  res.json({
    product: req.product.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  if (req.user.admin) {
    Product.create(req.body.product)
      .then(product =>
        res.status(201)
          .json({
            product: product.toJSON({ virtuals: true, user: req.user })
          }))
      .catch(next)
  } else {
    res.sendStatus(401)
  }
}

const update = (req, res, next) => {
  if (req.user.admin) {
    req.product.update(req.body.product)
      .then(() => res.sendStatus(204))
      .catch(next)
  } else {
    res.sendStatus(401)
  }
}

const destroy = (req, res, next) => {
  if (req.user.admin) {
    req.product.remove()
      .then(() => res.sendStatus(204))
      .catch(next)
  } else {
    res.sendStatus(401)
  }
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show', 'destroy', 'update', 'create'] },
  { method: setModel(Product), only: ['show', 'destroy', 'update'] }
] })
