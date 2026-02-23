const Experience = require('../models/Experience');

// @desc    Get all experience
// @route   GET /api/experience
// @access  Public
const getExperience = async (req, res) => {
    try {
        const experience = await Experience.find().sort({ createdAt: -1 });
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Bulk update experience
// @route   PUT /api/admin/experience
// @access  Private
const updateExperience = async (req, res) => {
    const { experience } = req.body;
    try {
        // This is a simple implementation: clear and re-insert
        // In production, you might want to sync instead
        await Experience.deleteMany({});
        const newExperience = await Experience.insertMany(experience);
        res.json(newExperience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getExperience, updateExperience };
