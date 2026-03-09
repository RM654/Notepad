const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // DEBUG: print the URI
    console.log('Connecting to MongoDB at:', process.env.MONGO_URI);

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected ✅');
  } catch (error) {
    console.error('MongoDB connection failed ❌:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;