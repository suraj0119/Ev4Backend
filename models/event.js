const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  capacity: Number,
  price: { type: Number, default: 0 },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isCanceled: { type: Boolean, default: false },
});

module.exports = mongoose.model('Event', eventSchema);
