const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

// Initialize app
const app = express();

// Use middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const con = require('./db/connection.js');

// Use routes
app.use(require('./routes/route'));

// Start server
con.then(db => {
    if (!db) return process.exit(1);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(error => {
    console.error(`Connection Failed: ${error}`);
});
