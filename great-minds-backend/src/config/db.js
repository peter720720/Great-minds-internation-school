const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.warn('MONGO_URI is not configured; database connection skipped.');
        return false;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Atlas cluster connected successfully.');
        return true;
    } catch (err) {
        console.error('Database connection failed:', err.message);
        return false;
    }
};

module.exports = connectDB;
