const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/model').User;
const authenticateToken = require('../middleware/auth');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const aiController = require('../controller/aiController');

// Ensure uploads directory exists with absolute path
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExt}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 10 // Max 10 files
    }
});

// Middleware to handle multer errors
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({ message: 'Too many files. Maximum is 10 files.' });
        }
        return res.status(400).json({ message: 'File upload error.' });
    }
    next(err);
};

// File upload endpoint
router.post('/upload', authenticateToken, upload.single('file'), handleMulterError, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ 
        filePath: `/uploads/${req.file.filename}`,
        fileName: req.file.filename
    });
});

// AI Analysis Routes
router.post('/ai/analysis', authenticateToken, aiController.analyzeSpending);
// Add GET route for frontend compatibility
router.get('/analyze-spending', authenticateToken, aiController.analyzeSpending);

// Transaction Routes
router.put('/transaction/:id', authenticateToken, upload.array('files', 10), handleMulterError, controller.updateTransaction);

router.route('/transaction')
    .post(authenticateToken, upload.array('files', 10), handleMulterError, (req, res, next) => {
        if (req.files) {
            req.fileMap = req.files.map(file => ({
                fileName: file.filename,
                fileUrl: `/uploads/${file.filename}`
            }));
        }
        controller.create_Transaction(req, res, next);
    })
    .get(authenticateToken, controller.get_Transaction)
    .delete(authenticateToken, controller.delete_Transaction);

// Category Routes
router.route('/categories')
    .post(authenticateToken, controller.create_Categories)
    .get(authenticateToken, controller.get_Categories);

// Labels Route
router.route('/labels')
    .get(authenticateToken, controller.get_Labels);

// Serve uploaded files with authentication
router.get('/uploads/:filename', authenticateToken, (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);
    res.sendFile(filePath);
});

// Authentication Routes
router.post(
    '/signup',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();

            const token = jwt.sign(
                { userId: newUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(201).json({ 
                token: token, 
                userId: newUser._id,
                message: 'User created successfully!' 
            });
        } catch (err) {
            res.status(500).json({ message: 'Error creating user', error: err });
        }
    }
);

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials!' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token: token, user: user._id });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
});

module.exports = router;