const mongoose = require('mongoose');
const autoIncrementId = require('../utils/autoIncrementId');


const workHistorySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  company: String,
  position: String,
  startDate: Date,
  endDate: Date,
  isCurrent: Boolean,
  description: String
}, { timestamps: true });

// Auto-increment `id` before save
autoIncrementId(workHistorySchema, 'WorkHistory');

module.exports = mongoose.model('WorkHistory', workHistorySchema);
