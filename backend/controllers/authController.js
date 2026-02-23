const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
    const email = req.body.email?.trim();
    const password = req.body.password; // Do not trim password usually, but check if it helps

    try {
        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                email: admin.email,
                token: jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
                    expiresIn: '1d',
                }),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginAdmin };
