// membership.model.js
const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
});

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;
