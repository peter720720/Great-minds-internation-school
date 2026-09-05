const Applicant = require('../models/Applicant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendSystemEmail } = require('../config/email');
const cloudinary = require('../config/cloudinary');

const createStudentId = (classApplied) => {
    const levelPrefix = classApplied.startsWith('Primary') ? 'PRI' : 'SEC';
    const year = new Date().getFullYear();
    const sequence = Math.floor(100000 + Math.random() * 900000);
    return `GMI-${levelPrefix}-${year}-${sequence}`;
};

exports.registerApplicant = async (req, res) => {
    const { fullName, email, password, classApplied, department } = req.body;
    try {
        if (classApplied.startsWith('Ss ') && !department) {
            return res.status(400).json({ message: 'Select a department for Senior Secondary.' });
        }

        const existing = await Applicant.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email address already registered.' });

        const applicant = new Applicant({ fullName, email, password, classApplied, department: classApplied.startsWith('Ss ') ? department : '', studentId: createStudentId(classApplied) });
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

        if (!applicant.studentId) {
            applicant.studentId = createStudentId(applicant.classApplied);
            await applicant.save();
        }

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

exports.updateApplicantProfile = async (req, res) => {
    const { fullName, email, phoneNumber, alternateEmail, currentPassword, newPassword } = req.body;

    try {
        const applicant = await Applicant.findById(req.user.id);
        if (!applicant) return res.status(404).json({ message: 'Student profile not found.' });

        if (email && email !== applicant.email) {
            const existing = await Applicant.findOne({ email, _id: { $ne: applicant._id } });
            if (existing) return res.status(400).json({ message: 'Email address already registered.' });
            applicant.email = email;
        }

        if (fullName) applicant.fullName = fullName;
        applicant.phoneNumber = phoneNumber || '';
        applicant.alternateEmail = alternateEmail || '';

        if (newPassword) {
            if (!currentPassword) return res.status(400).json({ message: 'Enter your current password before setting a new one.' });
            const isMatch = await bcrypt.compare(currentPassword, applicant.password);
            if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect.' });
            applicant.password = newPassword;
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'great_minds/student_profiles' });
            applicant.profilePicture = result.secure_url;
        }

        await applicant.save();
        const profile = applicant.toObject();
        delete profile.password;
        res.status(200).json({ message: 'Profile updated successfully.', profile });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
