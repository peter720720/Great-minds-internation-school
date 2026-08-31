const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error('Only system-supported images (.png, .jpg, .jpeg) are allowed'), false);
    }
    cb(null, true);
};

module.exports = multer({ storage, fileFilter });
