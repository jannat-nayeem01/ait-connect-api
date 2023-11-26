// group.model.js
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  memberships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Membership' }],

});


const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
