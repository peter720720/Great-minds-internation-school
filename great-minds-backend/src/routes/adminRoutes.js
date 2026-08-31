const express = require('express');
const router = express.Router();
const { 
    loginAdmin, uploadGalleryImage, getContactMessages, 
    getAdminDashboardMetrics, approveStaffMember, deleteGalleryImage 
} = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/admin-login', loginAdmin);
router.get('/admin-dashboard', protectAdmin, getAdminDashboardMetrics);
router.post('/upload', protectAdmin, upload.single('image'), uploadGalleryImage);
router.get('/messages', protectAdmin, getContactMessages);
router.patch('/approve-staff/:staffId', protectAdmin, approveStaffMember);
router.delete('/gallery/:id', protectAdmin, deleteGalleryImage);

module.exports = router;
