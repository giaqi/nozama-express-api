'use strict'

const mongoose = require('mongoose')

const shoppingCartSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  user_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  product_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
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

shoppingCartSchema.virtual('length').get(function length () {
  return this.text.length
})

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema)

module.exports = ShoppingCart
