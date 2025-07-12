const mongoose = require('mongoose');
const autoIncrementId = require('../utils/autoIncrementId');

const educationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null, // null = currently studying
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

autoIncrementId(educationSchema, 'Education');

module.exports = mongoose.model('Education', educationSchema);
