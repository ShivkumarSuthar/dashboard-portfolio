const mongoose = require('mongoose');
const autoIncrementId = require('../utils/autoIncrementId');

const linkItemSchema = new mongoose.Schema({
  name: String,
  url: String,
});

const profileOverviewSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  fullName: String,
  title: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  profileImage: String, // just URL
  logo: {
    isImage: Boolean,
    value: String,
  },
  links: {
    type: Map,
    of: [linkItemSchema],
    default: {},
  },
}, { timestamps: true });

autoIncrementId(profileOverviewSchema, 'ProfileOverview');

module.exports = mongoose.model('ProfileOverview', profileOverviewSchema);
