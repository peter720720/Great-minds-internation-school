const Admin = require('../models/Admin');
const Gallery = require('../models/Gallery');
const Message = require('../models/Message');
const Applicant = require('../models/Applicant');
const Staff = require('../models/Staff');
const NewsEvent = require('../models/NewsEvent');
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const xss = require('xss');

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: 'Invalid administrator credentials.' });
        }
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, admin: { id: admin._id, username: admin.username, email: admin.email, role: admin.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.uploadGalleryImage = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'An image file is required.' });
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Image title is required.' });
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'great-minds/gallery' });
        const image = await Gallery.create({
            title: xss(title),
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id,
            uploadedBy: req.admin.id
        });
        res.status(201).json({ message: 'Gallery image published.', image });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getContactMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAdminDashboardMetrics = async (req, res) => {
    try {
        const stats = {
            totalApplicants: await Applicant.countDocuments(),
            paidApplications: await Applicant.countDocuments({ paymentStatus: 'Paid' }),
            pendingStaffApprovals: await Staff.countDocuments({ isApproved: false }),
            unreadMessages: await Message.countDocuments({ isRead: false })
        };
        res.status(200).json({ metrics: stats });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createNewsEvent = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'News title and content are required.' });
    try {
        const newsEvent = await NewsEvent.create({ title: xss(title), content: xss(content), createdBy: req.admin.id });
        res.status(201).json({ message: 'News and event published.', newsEvent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.approveStaffMember = async (req, res) => {
    const { staffId } = req.params;
    try {
        const staff = await Staff.findByIdAndUpdate(staffId, { isApproved: true }, { new: true });
        res.status(200).json({ message: 'Staff portal authorization granted.', staff });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteGalleryImage = async (req, res) => {
    const { id } = req.params;
    try {
        const image = await Gallery.findById(id);
        if (!image) return res.status(404).json({ message: 'Image asset not found.' });

        await cloudinary.uploader.destroy(image.cloudinaryId);
        await Gallery.findByIdAndDelete(id);

        res.status(200).json({ message: 'Asset purged from public gallery view.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
