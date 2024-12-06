const Subscribe = require('../models/subscribe'); // Mengimpor model Subscribe

const createSubscription = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    // Pastikan data yang dibutuhkan sudah ada
    if (!username || !email || !message) {
      return res.status(400).json({ message: 'Please fill out all fields' });
    }

    // Membuat instance subscription baru
    const newSubscription = new Subscribe({
      username,
      email,
      message,
    });

    // Simpan subscription ke database
    await newSubscription.save();

    res.status(200).json({
      message: 'Subscription created successfully',
      subscription: newSubscription,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating subscription',
      error: error.message,
    });
  }
};

module.exports = { createSubscription };
