const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    githubUrl: { type: String },
    linkedinUrl: { type: String },
    email: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Home', homeSchema);
