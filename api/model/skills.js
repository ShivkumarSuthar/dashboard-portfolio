const mongoose = require('mongoose');
const autoIncrementId = require('../utils/autoIncrementId');

const skillSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    cat_description: {
      type: String,
      trim: true,
    },
    skills: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        level: {
          type: String,
          trim: true,
        },
        experienceYears: {
          type: Number,
          default: 0,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// 🪄 Apply the helper here
autoIncrementId(skillSchema, 'SkillCategory');


module.exports = mongoose.model('SkillCategory', skillSchema);
