const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Bulk update projects
// @route   PUT /api/admin/projects
// @access  Private
const updateProjects = async (req, res) => {
    const { projects } = req.body;
    try {
        await Project.deleteMany({});
        const newProjects = await Project.insertMany(projects);
        res.json(newProjects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getProjects, updateProjects };
