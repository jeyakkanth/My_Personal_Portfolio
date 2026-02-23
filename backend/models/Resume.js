const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    resumeUrl: { type: String, required: true },
    lastUpdated: { type: String },
    highlights: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
