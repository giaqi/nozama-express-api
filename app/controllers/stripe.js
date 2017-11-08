'use strict'

const controller = require('lib/wiring/controller')
const setUser = require('./concerns/set-current-user')

const models = require('app/models')
const Purchase = models.purchase

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const create = function (req, res, next) {
  const amount = +req.user.cartItemTotal * 100

  const custPurchase = {
    _owner: req.user._id,
    totalPrice: req.user.cartItemPrice,
    totalItems: req.user.cartItemTotal,
    products: req.user.cart
  }

  if (Object.keys(custPurchase).every(key => !!custPurchase[key])) {
    stripe.charges.create({
      amount,
      description: req.user.email + ' ' + Date.now(),
      currency: 'usd',
      source: req.body.token || 'tok_visa'
    })
      .then((response) => {
        const stripePurchase = Object.assign(custPurchase, {
          stripe_purch_id: response.id
        })
        return Purchase.create(stripePurchase)
      })
      .then((purchase) => {
        res.status(201)
          .json({
            purchase: purchase.toJSON({ virtuals: true, user: req.user })
          })
      })
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
  create
}, { before: [
  { method: setUser }
] })
