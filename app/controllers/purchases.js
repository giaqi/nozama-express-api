'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Purchase = models.purchase

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Purchase.find()
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
  const purchase = Object.assign(req.body.purchase, {
    _owner: req.user._id
  })
  Purchase.create(purchase)
    .then(purchase =>
      res.status(201)
        .json({
          purchase: purchase.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body.purchase._owner  // disallow owner reassignment.

  req.purchase.update(req.body.purchase)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.purchase.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Purchase), only: ['show'] },
  { method: setModel(Purchase, { forUser: true }), only: ['update', 'destroy'] }
] })