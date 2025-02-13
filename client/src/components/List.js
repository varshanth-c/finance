import React, { useState } from 'react';
import 'boxicons';
import { default as api } from '../store/apiSlice';

export default function List() {
    const { data: transactions, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
    const [deleteTransaction] = api.useDeleteTransactionMutation();
    const [selectedTransactions, setSelectedTransactions] = useState([]);
    const [showTransactions, setShowTransactions] = useState(false);
    let Transactions;

    const handleCheckboxChange = (e) => {
        const id = e.target.value;
        if (e.target.checked) {
            setSelectedTransactions([...selectedTransactions, id]);
        } else {
            setSelectedTransactions(selectedTransactions.filter(item => item !== id));
        }
    };

    const handleDeleteSelected = () => {
        selectedTransactions.forEach(id => deleteTransaction({ _id: id }));
        setSelectedTransactions([]);
    };

    const handleDeleteAll = () => {
        transactions.forEach(transaction => deleteTransaction({ _id: transaction._id }));
    };

    if (isFetching) {
        Transactions = <div>Fetching</div>;
    } else if (isSuccess) {
        const sortedTransactions = transactions.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
        Transactions = sortedTransactions.map((v, i) => (
            <Transaction key={i} category={v} handler={handleCheckboxChange} selectedTransactions={selectedTransactions}></Transaction>
        ));
    } else if (isError) {
        Transactions = <div>Error</div>;
    }

    const toggleShowTransactions = () => {
        setShowTransactions(!showTransactions);
    };

    return (
        <div className="transaction-list-container flex flex-col py-6 gap-3">
            <h1 className='py-4 font-bold text-xl cursor-pointer' onClick={toggleShowTransactions}>History</h1>
            {showTransactions && (
                <>
                    <div className="flex justify-between mb-4">
                        <button onClick={handleDeleteSelected} className="button-3d">Delete Selected</button>
                        <button onClick={handleDeleteAll} className="button-3d">Delete All</button>
                    </div>
                    {Transactions}
                </>
            )}
        </div>
    );
}

function Transaction({ category, handler, selectedTransactions }) {
    if (!category) return null;

    const formattedDate = new Date(category.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div className="item flex justify-between py-2 px-4 mb-2"
            style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}>
            <input
                type="checkbox"
                value={category._id ?? ''}
                checked={selectedTransactions.includes(category._id)}
                onChange={handler}
                className="mr-3"
            />
            <div className='flex flex-col'>
                <span className='block' style={{ color: category.color ?? "#e5e5e5" }}>
                    {category.name ?? ''}
                </span>
                <span className='block text-sm text-gray-500'>{formattedDate}</span>
            </div>
        </div>
    );
}
