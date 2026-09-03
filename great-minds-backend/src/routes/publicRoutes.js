const express = require('express');
const router = express.Router();
const { submitContactForm, getPublicGallery, getPublicNewsEvents } = require('../controllers/publicController');
const { contactFormLimiter } = require('../middleware/rateLimiter');

router.post('/contact-us', contactFormLimiter, submitContactForm);
router.get('/gallery', getPublicGallery);
router.get('/news-events', getPublicNewsEvents);

module.exports = router;
