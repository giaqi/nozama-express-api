'use strict'

const mongoose = require('mongoose')

// delete after testing
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/nozama-express-api', {
  useMongoClient: true
})

const db = mongoose.connection

const done = function () {
  db.close()
}
// end testing

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

const Product = mongoose.model('Product', productSchema)

// testing below here
Product.create({
  picture_URL: 'https://imgur.com/QOfuwAs',
  name: 'Henry 200',
  description: 'The smiley Henry 200 vacuum cleaner',
  price: 125
})
  .then(result => result.toObject())
  .then(console.log)
  // add this .catch second to last so that the db still closes
  .catch(console.error)
  .then(done)

module.exports = Product
