'use strict'

const controller = require('lib/wiring/controller')
const setUser = require('./concerns/set-current-user')
const stripe = require('stripe')(process.env.SECRET_KEY)

const create = function (req, res, next) {
  const amount = +req.user.cartItemTotal * 100

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: req.user.email + ' ' + Date.now(),
        currency: 'usd',
        customer: customer.id
      }))
    .then(/* kick off purchase, don't need args anymore, not storing anything from Stripe */)
    .catch(next)
}

module.exports = controller({
  create
}, { before: [
  { method: setUser }
] })
