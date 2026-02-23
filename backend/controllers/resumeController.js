const Resume = require('../models/Resume');

// @desc    Get resume data
// @route   GET /api/resume
// @access  Public
const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne();
        res.json(resume || {});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update resume data
// @route   PUT /api/admin/resume
// @access  Private
const updateResume = async (req, res) => {
    try {
        let resume = await Resume.findOne();

        if (resume) {
            resume = await Resume.findByIdAndUpdate(resume._id, req.body, { new: true });
        } else {
            resume = await Resume.create(req.body);
        }

        res.json(resume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getResume, updateResume };
