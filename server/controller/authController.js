
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function register(req, res) {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: `Error during registration: ${err.message}` });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isValid = await bcrypt.compare(password, user.password); // Compare passwords
        if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: `Error during login: ${err.message}` });
    }
}

module.exports = { register, login };