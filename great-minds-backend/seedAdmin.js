require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');

const seedInitialAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URL);
        console.log('Database connected for admin provisioning...');

        // Check if an admin already exists
        const adminCheck = await Admin.findOne({ email: 'admin@greatminds.com' });
        if (adminCheck) {
            console.log('An administrative node already exists with this email.');
            process.exit(0);
        }

        const primaryAdmin = new Admin({
            username: 'greatminds_admin',
            email: 'admin@greatminds.com',
            password: 'SecureAdminPassword2026!' // Change this immediately after your first successful login
        });

        await primaryAdmin.save();
        console.log('====================================================');
        console.log('SUCCESS: Initial Admin Created Safely!');
        console.log('Email: admin@greatminds.com');
        console.log('Password: SecureAdminPassword2026!');
        console.log('====================================================');
        process.exit(0);
    } catch (error) {
        console.error('Provisioning failure:', error.message);
        process.exit(1);
    }
};

seedInitialAdmin();
