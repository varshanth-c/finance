import React from 'react';
import { useUpdateTransactionMutation } from '../store/apiSlice';
import Form from './Form'; // Your existing form component

export default function TransactionDetails({ transaction, onClose }) {
    const [updateTransaction] = useUpdateTransactionMutation();

    const handleSubmit = async (submittedData) => {
        try {
            await updateTransaction({
                _id: transaction._id,
                formData: submittedData.formData
            }).unwrap();
            onClose();
        } catch (err) {
            console.error('Failed to update transaction:', err);
        }
    };

    return (
        <div className="transaction-details">
            <button onClick={onClose} className="back-btn">← Back</button>
            <h3>Transaction Details</h3>
            
            <div className="files-section">
                {transaction.notes?.map((note, index) => (
                    note.fileUrl && (
                        <div key={index} className="file-item">
                            <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">
                                {note.fileName || 'View File'}
                            </a>
                        </div>
                    )
                ))}
            </div>

            <Form 
                initialData={transaction}
                onSubmit={handleSubmit}
                isEditMode={true}
            />
        </div>
    );
}