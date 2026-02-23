const Home = require('../models/Home');

// @desc    Get home data
// @route   GET /api/home
// @access  Public
const getHome = async (req, res) => {
    try {
        const home = await Home.findOne();
        res.json(home || {});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update home data
// @route   PUT /api/admin/home
// @access  Private
const updateHome = async (req, res) => {
    try {
        let home = await Home.findOne();

        if (home) {
            home = await Home.findByIdAndUpdate(home._id, req.body, { new: true });
        } else {
            home = await Home.create(req.body);
        }

        res.json(home);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getHome, updateHome };
