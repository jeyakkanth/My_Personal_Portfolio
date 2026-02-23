const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

// Routes
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const projectRoutes = require('./routes/projectRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/messages', messageRoutes);

const startServer = async () => {
    await connectDB();

    // Create initial admin if not exists
    const createInitialAdmin = async () => {
        try {
            const adminEmail = process.env.ADMIN_EMAIL?.trim();
            const adminPassword = process.env.ADMIN_PASSWORD?.trim();

            let admin = await Admin.findOne({ email: adminEmail });

            if (!admin) {
                await Admin.create({
                    email: adminEmail,
                    password: adminPassword,
                });
                console.log(`Initial admin user created: ${adminEmail}`);
            } else {
                // Only update if password actually changed in .env
                const isMatch = await admin.matchPassword(adminPassword);
                if (!isMatch) {
                    admin.password = adminPassword;
                    await admin.save();
                    console.log(`Admin credentials updated from .env for: ${adminEmail}`);
                } else {
                    console.log('Admin credentials synced and valid');
                }
            }
        } catch (error) {
            console.error(`Admin logic error: ${error.message}`);
        }
    };
    await createInitialAdmin();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
