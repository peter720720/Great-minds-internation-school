const express = require('express');
const router = express.Router();
const { registerApplicant, loginApplicant, verifyApplicationPayment } = require('../controllers/applicantController');
const { protectUser } = require('../middleware/auth');

router.post('/signup', registerApplicant);
router.post('/login', loginApplicant);
router.post('/verify-payment', protectUser, verifyApplicationPayment);

module.exports = router;
