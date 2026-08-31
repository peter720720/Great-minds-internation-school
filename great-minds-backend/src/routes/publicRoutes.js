const express = require('express');
const router = express.Router();
const { submitContactForm, getPublicGallery } = require('../controllers/publicController');
const { contactFormLimiter } = require('../middleware/rateLimiter');

router.post('/contact-us', contactFormLimiter, submitContactForm);
router.get('/gallery', getPublicGallery);

module.exports = router;
