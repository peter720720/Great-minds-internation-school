const express = require('express');
const router = express.Router();
const { registerApplicant, loginApplicant, verifyApplicationPayment, updateApplicantProfile } = require('../controllers/applicantController');
const { protectUser } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/signup', registerApplicant);
router.post('/login', loginApplicant);
router.post('/verify-payment', protectUser, verifyApplicationPayment);
router.put('/profile', protectUser, upload.single('profilePicture'), updateApplicantProfile);

module.exports = router;
