const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Register a new User
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword, role: 'user' });
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(400).json({ message: "Email already exists" });
    }
};

// 2. Login User/Admin
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate Token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            'YOUR_SECRET_KEY', // In production, move this to .env
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Special Function to create the Permanent Admin
const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ email: 'admin@zoo.com' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                name: 'System Admin',
                email: 'admin@zoo.com',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Permanent Admin Created: admin@zoo.com / admin123');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

module.exports = { register, login, seedAdmin };