const Message = require('../models/Message');
const Gallery = require('../models/Gallery');
const xss = require('xss');
const NewsEvent = require('../models/NewsEvent');

exports.submitContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const cleanMessage = new Message({
            name: xss(name),
            email: xss(email),
            subject: xss(subject),
            message: xss(message)
        });
        await cleanMessage.save();
        res.status(201).json({ message: 'Your message has reached our administration desk successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPublicGallery = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPublicNewsEvents = async (req, res) => {
    try {
        const newsEvents = await NewsEvent.find().sort({ createdAt: -1 });
        res.status(200).json(newsEvents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
