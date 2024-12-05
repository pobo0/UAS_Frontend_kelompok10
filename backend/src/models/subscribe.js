const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Pastikan username unik
  },
  email: {
    type: String,
    required: true,
    unique: true, // Pastikan email unik
  },
  message: {
    type: String,
    required: true
  },
  subscriptionDate: {
    type: Date,
    default: Date.now, // Tanggal saat subscribe dilakukan
  },
});

// Membuat model Subscribe berdasarkan schema
const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe;
