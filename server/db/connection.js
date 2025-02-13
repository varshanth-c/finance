const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => {
    console.log('Database Connected');
    return db;
}).catch(err => {
    console.error('Connection Error: ', err);
});

module.exports = conn;
