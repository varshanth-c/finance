import React, { useState } from 'react';
import { default as api } from '../store/apiSlice';

export default function TransactionForm() {
    const [transaction, setTransaction] = useState({
        name: '',
        amount: '',
        category: '',
        color: '#000000'
    });

    const [addTransaction] = api.useAddTransactionMutation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTransaction((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add current date and time to the transaction
        const newTransaction = {
            ...transaction,
            date: new Date().toISOString() // Capture the current date and time
        };

        await addTransaction(newTransaction);
        setTransaction({
            name: '',
            amount: '',
            category: '',
            color: '#000000'
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={transaction.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
                <label>Amount:</label>
                <input type="number" name="amount" value={transaction.amount} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
                <label>Category:</label>
                <input type="text" name="category" value={transaction.category} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
                <label>Color:</label>
                <input type="color" name="color" value={transaction.color} onChange={handleInputChange} required />
            </div>
            <button type="submit">Make Transaction</button>
        </form>
    );
}
