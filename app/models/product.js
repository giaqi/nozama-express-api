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
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
