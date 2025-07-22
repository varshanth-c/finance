const mongoose = require('mongoose');
const model = require('../models/model');

async function create_Categories(req, res) {
    try {
        const newCategory = new model.Categories({
            type: 'Savings',
            color: '#ffcd56'
        });

        const savedCategory = await newCategory.save();
        res.json(savedCategory);
    } catch (err) {
        res.status(400).json({ message: `Error while creating category: ${err.message}` });
    }
}

async function get_Categories(req, res) {
    try {
        const categories = await model.Categories.find();
        res.json(categories.map(category => ({
            type: category.type,
            color: category.color
        })));
    } catch (error) {
        res.status(400).json({ error: 'Category retrieval failed', details: error.message });
    }
}

async function create_Transaction(req, res) {
    try {
        // Parse transaction data from FormData
        const transactionData = JSON.parse(req.body.transactionData);
        
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Handle file uploads and process notes
        const processedNotes = transactionData.notes.map((note, index) => {
            let fileName = null;
            let fileUrl = null;

            if (req.files && req.files[index]) {
                const file = req.files[index];
                fileName = file.filename;
                fileUrl = `/uploads/${fileName}`;
            }

            return {
                text: note.text,
                fileName: fileName,
                fileUrl: fileUrl
            };
        });

        // Create new transaction with processed data
        const newTransaction = new model.Transaction({
            name: transactionData.name,
            type: transactionData.type,
            amount: transactionData.amount,
            date: transactionData.date || new Date(),
            userId: req.user.userId,
            notes: processedNotes,
            isRecurring: transactionData.isRecurring,
            recurringFrequency: transactionData.recurringFrequency
        });

        const savedTransaction = await newTransaction.save();
        res.json(savedTransaction);
    } catch (err) {
        res.status(400).json({ message: `Error while creating transaction: ${err.message}` });
    }
}
// In controller.js - Modify updateTransaction
async function updateTransaction(req, res) {
    try {
        // Parse transaction data from FormData
        const transactionData = JSON.parse(req.body.transactionData);
        
        if (!req.user?.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Process files
        const processedNotes = transactionData.notes.map((note, index) => {
            // Keep existing files
            if (note.fileUrl) return note;
            
            // Add new files
            if (req.files?.[index]) {
                const file = req.files[index];
                return {
                    ...note,
                    fileName: file.filename,
                    fileUrl: `/uploads/${file.filename}`
                };
            }
            
            return note;
        });

        const updatedTransaction = await model.Transaction.findOneAndUpdate(
            { 
                _id: req.params.id, 
                userId: req.user.userId 
            },
            {
                ...transactionData,
                notes: processedNotes
            },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ 
            message: `Error updating transaction: ${err.message}` 
        });
    }
}
async function get_Transaction(req, res) {
    try {
        const transactions = await model.Transaction.find({ userId: req.user.userId }).sort({ date: -1 }).select('-__v');
        res.json(transactions);
    } catch (err) {
        res.status(400).json({ message: `Error while fetching transactions: ${err.message}` });
    }
}

async function get_Labels(req, res) {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const result = await model.Transaction.aggregate([
            { $match: { userId: userId } },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'type',
                    foreignField: 'type',
                    as: 'categories_info'
                }
            },
            { $unwind: '$categories_info' }
        ]);

        const data = result.map(v => ({
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info.color,
            date: v.date,
            notes: v.notes,
            isRecurring: v.isRecurring,
            recurringFrequency: v.recurringFrequency
        }));

        res.json(data);
    } catch (error) {
        res.status(400).json({ message: 'Lookup Collection Error', details: error.message });
    }
}

async function delete_Transaction(req, res) {
    try {
        const result = await model.Transaction.deleteOne({ _id: req.body._id, userId: req.user.userId });
        if (!result.deletedCount) return res.status(404).json({ message: 'Transaction not found' });
        res.json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: `Error deleting transaction: ${err.message}` });
    }
}

module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels,
    updateTransaction
};