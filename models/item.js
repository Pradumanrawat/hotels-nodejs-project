const mongoose = require('mongoose');
//define the  item schemea//
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  ingridient: {
    type: String,
    enum: ['chicken', 'veg', 'masala'],
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String

  }

})

//create  item model
const item = mongoose.model('item', itemSchema);
module.exports = item;