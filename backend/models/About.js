const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    bio: { type: String, required: true },
    location: { type: String },
    education: { type: String },
    university: { type: String },
    graduationYear: { type: String },
    skills: { type: String },
    interests: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
