const mongoose = require('mongoose');
const autoIncrementId = require('../utils/autoIncrementId');


const projectSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  liveUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  order: {
    type: Number,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// 🪄 Apply the helper here
autoIncrementId(projectSchema, 'Project');

module.exports = mongoose.model('Project', projectSchema);
