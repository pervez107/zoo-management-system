const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // <--- NEW: File System module
const router = express.Router();

// NEW: Auto-create the 'uploads' folder if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 1. Configure Multer Storage
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // Save files in the 'uploads' folder
    },
    filename(req, file, cb) {
        // Rename file to: image-163234234.jpg
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// 2. Validate File Type (Ensure it's an image)
const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
};

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// 3. The Upload Route: POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
    if (req.file) {
        // Send back the file path so the frontend can save it to MongoDB
        res.json({ imageUrl: `/uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ message: "No image file provided" });
    }
});

module.exports = router;