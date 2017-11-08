'use strict'

const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  stripe_purch_id: {
    type: String,
    required: true
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

// purchaseSchema.virtual('length').get(function length () {
//   return this.text.length
// })

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase
