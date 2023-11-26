// informationModel.js
const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Information', informationSchema);
