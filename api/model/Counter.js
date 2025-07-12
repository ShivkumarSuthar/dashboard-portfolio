// models/Counter.js
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,         
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
}, {
  versionKey: false,
  timestamps: false // optional, we don’t need createdAt/updatedAt
});

module.exports = mongoose.model('Counter', counterSchema);
