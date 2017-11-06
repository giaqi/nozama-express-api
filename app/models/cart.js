'use strict'

const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  products: Array,
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

// cartSchema.virtual('products').get(function () {
//   return this.quantity.reduce(function (currentValue, previousValue) {
//     return (currentValue + previousValue)
//   })
// })
// cartSchema.virtual('products').get(function () {
//   return this.price.reduce(function (currentValue, previousValue) {
//     return (currentValue + previousValue)
//   })
// })

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
