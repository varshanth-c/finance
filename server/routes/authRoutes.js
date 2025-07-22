const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/model').User;
const { authenticateToken } = require('../middleware/auth');

// User Registration
router.post('/api/signup', 
  [
    body('username')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters'),
    body('email')
      .isEmail()
      .withMessage('Invalid email address')
      .custom(async email => {
        const user = await User.findOne({ email });
        if (user) throw new Error('Email already in use');
      }),
    body('password')
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage('Password must contain uppercase, lowercase, number, and special character')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      });

      await user.save();
      
      const token = jwt.sign(
        { userId: user.id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );

      res.status(201).json({ 
        token,
        userId: user.id,
        email: user.email
      });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed', error: err });
    }
  }
);

// User Login
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      userId: user.id,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
});

// Password Reset
router.post('/api/reset-password',
  authenticateToken,
  [
    body('newPassword')
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  ],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      const isSame = await bcrypt.compare(req.body.newPassword, user.password);
      if (isSame) return res.status(400).json({ message: 'New password must be different' });

      user.password = await bcrypt.hash(req.body.newPassword, 12);
      await user.save();
      
      res.json({ message: 'Password updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Password reset failed' });
    }
  }
);

module.exports = router;