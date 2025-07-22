const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: './config.env' });

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://varshanthgowdaml:varsh%40567@cluster1v.lmz5b2w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1v", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database Connected');
    })
    .catch((err) => {
        console.error('Connection Error: ', err);
        process.exit(1);
    });

// Import and use routes
const routes = require('./routes/route');
app.use('/api', routes);

// File cleanup routine
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');

setInterval(() => {
    const oneDay = 24 * 60 * 60 * 1000;
    fs.readdir(uploadDir, (err, files) => {
        if (err) return console.error('Error reading upload directory:', err);
        
        files.forEach(file => {
            const filePath = path.join(uploadDir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) return console.error('Error getting file stats:', err);
                
                const now = new Date().getTime();
                const endTime = new Date(stats.ctime).getTime() + oneDay;
                
                if (now > endTime) {
                    fs.unlink(filePath, err => {
                        if (err) console.error('Error deleting old file:', err);
                    });
                }
            });
        });
    });
}, 24 * 60 * 60 * 1000);

// Port configuration
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;