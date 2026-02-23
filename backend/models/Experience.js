const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    location: { type: String },
    description: { type: String, required: true },
    technologies: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
