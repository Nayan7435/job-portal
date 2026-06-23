const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
    );
};

// @desc    Register new user
// @route   POST /api/auth/signup
exports.signup = async (req,res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const user = await User.create({ name, email, password, role });

        const token = generateToken(user._id);

        res.status(201).json({
            message: 'User Registered Successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req,res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};