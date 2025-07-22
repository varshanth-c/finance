import React, { useState } from 'react';
import { IndianRupee, Calendar, Paperclip, X, ArrowRight, Plus, Minus } from 'lucide-react';
import { default as api } from '../store/apiSlice';

const NoteItem = ({ note, onChange, onFileChange, onFileRemove }) => {
    const handleChange = (e) => {
        e.persist();
        onChange(e.target.value);
    };

    return (
        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
            <textarea
                value={note.text || ''}
                onChange={handleChange}
                placeholder="Add details to your transaction..."
                className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
                rows={6}
            />
            
            {note.file ? (
                <div className="flex items-center justify-between bg-white p-2 rounded">
                    <div className="flex items-center space-x-2">
                        <Paperclip className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 truncate max-w-[200px]">
                            {note.file.name || note.file.fileName}
                        </span>
                        {note.file.url && (
                            <a 
                                href={note.file.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-500 hover:underline text-sm"
                            >
                                View
                            </a>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onFileRemove}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <input
                        type="file"
                        id="file-note"
                        onChange={(e) => onFileChange(e.target.files[0])}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx"
                    />
                    <label
                        htmlFor="file-note"
                        className="flex items-center space-x-1 text-sm text-gray-500 cursor-pointer hover:text-indigo-600 transition-colors"
                    >
                        <Paperclip className="h-4 w-4" />
                        <span>Attach file</span>
                    </label>
                </div>
            )}
        </div>
    );
};

export default function Form({ initialData, onSubmit: externalSubmit, isEditMode }) {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        type: 'Investment',
        amount: '',
        date: new Date().toISOString().split('T')[0]
    });
    
    const [note, setNote] = useState({ 
        text: '', 
        file: null 
    });

    const [showNote, setShowNote] = useState(false);

    const [addTransaction] = api.useAddTransactionMutation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNoteChange = (text) => {
        setNote(prev => ({ ...prev, text }));
    };

    const handleFileChange = (file) => {
        setNote(prev => ({ ...prev, file }));
    };

    const handleFileRemove = () => {
        setNote(prev => ({ ...prev, file: null }));
    };

    const toggleNote = () => {
        setShowNote(prev => !prev);
        if (!showNote) {
            setNote({ text: '', file: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const submissionData = {
            ...formData,
            amount: convertAmount(formData.amount),
            notes: showNote ? [{
                text: note.text,
                fileName: note.file?.name || note.file?.fileName,
                fileUrl: note.file?.url
            }] : []
        };

        const formDataObj = new FormData();
        formDataObj.append('transactionData', JSON.stringify(submissionData));

        if (showNote && note.file instanceof File) {
            formDataObj.append('files', note.file);
        }

        if (isEditMode) {
            await externalSubmit({
                _id: initialData._id,
                formData: formDataObj
            });
        } else {
            try {
                await addTransaction(formDataObj).unwrap();
                setFormData({
                    name: '',
                    type: 'Investment',
                    amount: '',
                    date: new Date().toISOString().split('T')[0]
                });
                setNote({ text: '', file: null });
                setShowNote(false);
            } catch (error) {
                console.error('Failed to add transaction:', error);
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-xl font-semibold mb-6">
                {isEditMode ? 'Edit Transaction' : 'New Transaction'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                    <div className="flex items-center gap-4">
                        <select 
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="bg-transparent border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500 text-gray-600 w-32"
                        >
                            <option value="Investment">💰 Savings</option>
                            <option value="Expense">💸 Expense</option>
                        </select>
                        
                        <div className="flex-1">
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="What's this transaction for?" 
                                className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500 px-3 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input 
                                type="text" 
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="Amount (e.g. 1000, 1k, 1l)"
                                className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500 pl-10 pr-3 py-2"
                                required
                                pattern="^\d+(\.\d{1,2})?([kKlLcCrRmM]?)?$"
                            />
                        </div>
                        
                        <div className="relative w-48">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input 
                                type="date" 
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500 pl-10 pr-3 py-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-gray-700 font-medium">Notes & Attachments</h2>
                        <button
                            type="button"
                            onClick={toggleNote}
                            className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm"
                        >
                            {showNote ? (
                                <>
                                    <Minus className="h-4 w-4" />
                                    Remove Note
                                </>
                            ) : (
                                <>
                                    <Plus className="h-4 w-4" />
                                    Add Note
                                </>
                            )}
                        </button>
                    </div>
                    
                    {showNote && (
                        <NoteItem
                            note={note}
                            onChange={handleNoteChange}
                            onFileChange={handleFileChange}
                            onFileRemove={handleFileRemove}
                        />
                    )}
                </div>

                <div className="flex gap-2">
                    <button 
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowRight className="h-5 w-5" />
                        {isEditMode ? 'Update Transaction' : 'Save Transaction'}
                    </button>
                </div>
            </form>
        </div>
    );
}

const convertAmount = (amount) => {
    if (typeof amount === 'string') {
        const cleaned = amount.replace(/[$,]/g, '');
        const multipliers = {
            'h': 100,
            'k': 1000,
            'l': 100000,
            'cr': 10000000,
            'm': 1000000,
            'b': 1000000000
        };
        
        for (const [suffix, multiplier] of Object.entries(multipliers)) {
            if (amount.toLowerCase().endsWith(suffix)) {
                return parseFloat(amount) * multiplier;
            }
        }
    }
    return parseFloat(amount);
};