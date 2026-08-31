const Applicant = require('../models/Applicant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendSystemEmail } = require('../config/email');

exports.registerApplicant = async (req, res) => {
    const { fullName, email, password, classApplied } = req.body;
    try {
        const existing = await Applicant.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email address already registered.' });

        const applicant = new Applicant({ fullName, email, password, classApplied });
        await applicant.save();

        // Transactional Email Confirmation Link Notification
        const html = `<h1>Welcome to Great Minds International</h1>
                      <p>Hello ${fullName}, your admissions account for <strong>${classApplied}</strong> has been successfully created.</p>
                      <p>Log in to complete your processing profile and complete mandatory processing fee payment structures.</p>`;
            try {
                await sendSystemEmail(email, 'Application Portal Registration Complete', html);
            } catch (emailError) {
                console.warn('Applicant created, but confirmation email could not be sent:', emailError.message);
            }

        res.status(201).json({ message: 'Registration successful. Check your email for onboarding updates.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginApplicant = async (req, res) => {
    const { email, password } = req.body;
    try {
        const applicant = await Applicant.findOne({ email });
        if (!applicant) return res.status(404).json({ message: 'Account not found.' });

        const isMatch = await bcrypt.compare(password, applicant.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = jwt.sign({ id: applicant._id, role: 'applicant' }, process.env.JWT_SECRET, { expiresIn: '1d' });
            const profile = applicant.toObject();
            delete profile.password;
            res.status(200).json({ token, profile });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyApplicationPayment = async (req, res) => {
    const { reference } = req.body;
    try {
        // Implement payment checking logic (e.g., Paystack/Flutterwave verification) here
        const applicant = await Applicant.findByIdAndUpdate(
            req.user.id, 
            { paymentStatus: 'Paid', paymentReference: reference }, 
            { new: true }
        );
        
        const html = `<h1>Payment Confirmation Received</h1>
                      <p>Thank you ${applicant.fullName}. Your application processing fee for admission into ${applicant.classApplied} has been logged.</p>`;
            try {
                await sendSystemEmail(applicant.email, 'Payment Confirmation Received', html);
            } catch (emailError) {
                console.warn('Payment recorded, but confirmation email could not be sent:', emailError.message);
            }

        res.status(200).json({ message: 'Payment recorded securely.', data: applicant });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
