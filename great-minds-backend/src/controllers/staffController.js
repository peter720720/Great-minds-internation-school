const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerStaff = async (req, res) => {
    const { fullName, email, password, role } = req.body;
    try {
        const existing = await Staff.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Account exists.' });

        const staff = new Staff({ fullName, email, password, role });
        await staff.save();

        res.status(201).json({ message: 'Staff registry filed. Awaiting administrator gateway validation authorization.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginStaff = async (req, res) => {
    const { email, password } = req.body;
    try {
        const staff = await Staff.findOne({ email });
        if (!staff) return res.status(404).json({ message: 'Staff node record not registered.' });

        if (!staff.isApproved) return res.status(403).json({ message: 'Access pending administrator structural profile review.' });

        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = jwt.sign({ id: staff._id, role: staff.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token, staff: { id: staff._id, name: staff.fullName, role: staff.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
