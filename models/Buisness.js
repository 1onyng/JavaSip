const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuisnessSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  buisness_name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  street_address: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  long: {
    type: Number,
    required: false
  },
  lat: {
    type: Number,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Buisness = mongoose.model('buisness', BuisnessSchema);