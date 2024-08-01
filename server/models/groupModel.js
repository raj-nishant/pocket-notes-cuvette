const mongoose = require('mongoose');

// Define Group schema
const groupSchema = new mongoose.Schema({
  groupName: String,
  color: String,
  notes: [{
    date: String,
    time: String,
    note: String,
  }],
});

module.exports = mongoose.model('Group', groupSchema);
