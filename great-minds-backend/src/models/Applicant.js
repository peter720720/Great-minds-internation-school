const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ApplicantSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studentId: { type: String, unique: true, sparse: true },
    phoneNumber: { type: String, default: '' },
    alternateEmail: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    classApplied: { 
        type: String, 
        required: true,
        enum: [
            'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
            'Jss 1', 'Jss 2', 'Jss 3', 'Ss 1', 'Ss 2', 'Ss 3'
        ]
    },
    department: {
        type: String,
        enum: ['', 'Science', 'Art', 'Commercial'],
        default: ''
    },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    paymentReference: { type: String, default: '' },
    admissionStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

ApplicantSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('Applicant', ApplicantSchema);
