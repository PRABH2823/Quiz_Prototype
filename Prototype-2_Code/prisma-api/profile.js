const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router(); // Use a router, not an app instance
const prisma = new PrismaClient();
const SECRET_KEY = "your_secret_key";

router.use(cors());
router.use(bodyParser.json());

// User Signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.login.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        await prisma.profile.create({
            data: {
                userId: newUser.id,
                fullName: "",
                bio: "",
            },
        });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error signing up" });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.login.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
});

// Fetch Profile
router.get('/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const profile = await prisma.profile.findUnique({ where: { userId: parseInt(userId) } });
        if (!profile) return res.status(404).json({ error: "Profile not found" });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Error fetching profile" });
    }
});

// Update Profile
router.put('/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    const { fullName, bio } = req.body;
    try {
        const updatedProfile = await prisma.profile.update({
            where: { userId: parseInt(userId) },
            data: { fullName, bio },
        });
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ error: "Error updating profile" });
    }
});

module.exports = router; // Export the router
