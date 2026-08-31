const Gallery = require('../models/Gallery');
const cloudinary = require('../config/cloudinary');

exports.addGalleryImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Please attach an image file.' });
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'great_minds_gallery' });
        
        const newImage = new Gallery({
            title: req.body.title || 'School Event Pic',
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id,
            uploadedBy: req.admin.id
        });
        await newImage.save();
        res.status(201).json({ message: 'Image uploaded successfully.', data: newImage });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeGalleryImage = async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);
        if (!image) return res.status(404).json({ message: 'Gallery item not found.' });

        await cloudinary.uploader.destroy(image.cloudinaryId);
        await Gallery.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Image deleted from database and Cloudinary storage.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
