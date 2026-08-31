require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./src/config/db');
const securityGuard = require('./src/middleware/arcjet');

const app = express();

// Secure Global Gateways
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inject Global Cloud Infrastructure Firewall
app.use(securityGuard);

// Link Database
connectDB();

// API Endpoints
app.use('/api/admin', require('./src/routes/adminRoutes'));
app.use('/api/public', require('./src/routes/publicRoutes'));
app.use('/api/applicants', require('./src/routes/applicantRoutes'));
app.use('/api/staff', require('./src/routes/staffRoutes'));
app.use('/api/gallery', require('./src/routes/galleryRoutes'));

app.get('/api/health', (req, res) => {
	res.json({ service: 'Great Minds International School API', status: 'ok' });
});

// Fallback Route Handler
app.use((req, res) => res.status(404).json({ message: 'Requested asset route is unavailable' }));

const PORT = process.env.PORT || 5000;
if (require.main === module) {
	app.listen(PORT, () => console.log(`Great Minds Backend Engine executing under ${process.env.NODE_ENV || 'development'} conditions on port ${PORT}`));
}

module.exports = app;
