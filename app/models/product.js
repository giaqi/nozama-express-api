'use strict'

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  picture_URL: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    get: getPrice,
    set: setPrice
  },
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

function getPrice (num) {
  return (num / 100).toFixed(2)
}

function setPrice (num) {
  return num * 100
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product
