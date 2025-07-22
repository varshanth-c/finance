import React, { useState } from 'react';
import { X, ChevronLeft, Trash2 } from 'lucide-react';
import { default as api, useUpdateTransactionMutation } from '../store/apiSlice';
import Form from './Form';

const HistoryDrawer = ({ isOpen, onClose }) => {
  const { data: transactions, refetch } = api.useGetLabelsQuery();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();

  const handleCheckboxChange = (e) => {
    const id = e.target.value;
    setSelectedTransactions(prev =>
      e.target.checked ? [...prev, id] : prev.filter(item => item !== id)
    );
    refetch();
  };

  const handleDeleteSelected = () => {
    selectedTransactions.forEach(id => deleteTransaction({ _id: id }));
    setSelectedTransactions([]);
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleUpdateTransaction = async (submittedData) => {
    try {
      await updateTransaction({
        _id: selectedTransaction._id,
        formData: submittedData.formData
      }).unwrap();
      setSelectedTransaction(null);
    } catch (err) {
      console.error('Failed to update transaction:', err);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer Container - Added absolute positioning wrapper */}
      <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
        {/* Drawer */}
        <div 
          className={`absolute inset-y-0 right-0 pointer-events-auto w-full md:w-2/3 lg:w-1/2 bg-white shadow-xl 
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Transaction History</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {selectedTransaction ? (
                <div className="p-4 animate-fade-in">
                  <button
                    onClick={() => setSelectedTransaction(null)}
                    className="flex items-center mb-4 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back
                  </button>
                  
                  <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
                  
                  {/* Files Section */}
                  {selectedTransaction.notes?.some(note => note.fileUrl) && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Attached Files</h4>
                      {selectedTransaction.notes.map((note, index) => (
                        note.fileUrl && (
                          <a
                            key={index}
                            href={note.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-600 hover:text-blue-800 mb-1"
                          >
                            {note.fileName || 'View File'}
                          </a>
                        )
                      ))}
                    </div>
                  )}

                  <Form
                    initialData={selectedTransaction}
                    onSubmit={handleUpdateTransaction}
                    isEditMode={true}
                  />
                </div>
              ) : (
                <div className="animate-fade-in">
                  {/* Bulk Actions */}
                  {selectedTransactions.length > 0 && (
                    <div className="p-4 bg-gray-50 border-b">
                      <button
                        onClick={handleDeleteSelected}
                        className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Selected ({selectedTransactions.length})
                      </button>
                    </div>
                  )}

                  {/* Transactions List */}
                  <div className="divide-y">
                    {transactions?.map(transaction => (
                      <div
                        key={transaction._id}
                        className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleTransactionClick(transaction)}
                      >
                        <input
                          type="checkbox"
                          value={transaction._id}
                          checked={selectedTransactions.includes(transaction._id)}
                          onChange={handleCheckboxChange}
                          onClick={(e) => e.stopPropagation()}
                          className="mr-4 h-4 w-4 rounded border-gray-300"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{transaction.name}</div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span className="font-medium text-gray-900">
                              ₹{transaction.amount}
                            </span>
                            <span className="mx-2">•</span>
                            <span>
                              {new Date(transaction.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryDrawer;