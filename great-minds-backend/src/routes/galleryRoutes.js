const express = require('express');
const router = express.Router();
const { addGalleryImage, removeGalleryImage } = require('../controllers/galleryController');
const { protectAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Admin protected endpoints for gallery adjustments
router.post('/', protectAdmin, upload.single('image'), addGalleryImage);
router.delete('/:id', protectAdmin, removeGalleryImage);

module.exports = router;
