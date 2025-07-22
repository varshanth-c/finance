const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    text: { type: String, default: '' },
    fileName: { type: String }, // Store the name of attached file
    fileUrl: { type: String }   // Store the URL/path of the file
});
// Categories model
const categoriesSchema = new Schema({
    type: { type: String, default: 'Investment' },
    color: { type: String, default: '#FCBE44' },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        default: null  // Allow system-wide categories
    }
     // Link to User
});

const transactionSchema = new Schema({
    name: { type: String, default: 'Anonymous' },
    type: { type: String, default: 'Investment' },
    amount: { type: Number },
    date: { type: Date, default: Date.now },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
   notes: [noteSchema],  // Array of notes
   // Link to User
});

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const Categories = mongoose.model('Categories', categoriesSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    Categories,
    Transaction,User
};