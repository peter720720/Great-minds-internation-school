const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;
    if (!mongoUri) {
        console.warn('MONGO_URI is not configured; database connection skipped.');
        return false;
    }
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB Atlas cluster connected successfully.');
        return true;
    } catch (err) {
        console.error('Database connection failed:', err.message);
        return false;
    }
};

module.exports = connectDB;
