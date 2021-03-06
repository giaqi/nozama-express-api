'use strict'

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')
.resources('products')
.resources('purchases', {only: ['create', 'index', 'show']})
.resources('users', { only: ['index', 'show'] })
.resources('stripe', { only: ['create'] })

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.patch('/add-cart-item/:id', 'users#addCartItem')
.patch('/remove-cart-item/:id', 'users#removeCartItem')

// all routes created
