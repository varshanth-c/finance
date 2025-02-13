/*import React from 'react';
import { getLabels } from '../helper/helper'; // Import getLabels correctly
import { default as api } from '../store/apiSlice'; // Import api from the correct path
import { colors } from '../colors'; // Import the color definitions

export default function Labels({ categories }) {
    const { data: transactions, isFetching, isSuccess, isError, error } = api.useGetLabelsQuery();

    let totalInvestment = 0;
    let totalExpenses = 0;
    let totalSavings = 0;
    let expensePercent = 0;
    let savingsPercent = 0;

    if (isFetching) {
        return <div>Loading labels...</div>;
    } else if (isError) {
        return <div>Error: {error?.message || 'Failed to load labels data'}</div>;
    } else if (isSuccess && transactions && categories) {
        // Calculate totals
        const labelsData = getLabels(transactions, categories);
        totalInvestment = labelsData.find(d => d.type === 'Savings')?.total + labelsData.find(d => d.type === 'Expense')?.total || 0;
        totalExpenses = labelsData.find(d => d.type === 'Expense')?.total || 0;
        totalSavings = totalInvestment - totalExpenses;

        if (totalInvestment !== 0) {
            expensePercent = (100 * totalExpenses) / totalInvestment;
            savingsPercent = (100 * totalSavings) / totalInvestment;
        }
    }

    return (
        <div className="flex flex-col py-4 gap-4">
            <div className="item flex justify-between bg-gray-50 py-2 px-4 rounded-md">
                <span className="font-bold">Investment:</span>
                <span className="text-blue-900" style={{ color: colors.investment, fontWeight: 'bold' }}>
                    <span>&#8377;</span> {totalInvestment.toFixed(2)} ({100}%)
                </span>
            </div>
            <div className="item flex justify-between bg-gray-50 py-2 px-4 rounded-md">
                <span className="font-bold">Expenses:</span>
                <span className="text-pink-600" style={{ color: colors.expenses, fontWeight: 'bold' }}>
                    <span>&#8377;</span> {totalExpenses.toFixed(2)} ({expensePercent.toFixed(2)}%)
                </span>
            </div>
            <div className="item flex justify-between bg-gray-50 py-2 px-4 rounded-md">
                <span className="font-bold">Savings:</span>
                <span className="text-green-600" style={{ color: colors.savings, fontWeight: 'bold' }}>
                    <span>&#8377;</span> {totalSavings.toFixed(2)} ({savingsPercent.toFixed(2)}%)
                </span>
            </div>
        </div>
    );
}
*/
import React from 'react';
import { getLabels } from '../helper/helper'; // Import getLabels correctly
import { default as api } from '../store/apiSlice'; // Import api from the correct path
import { colors } from '../colors'; // Import the color definitions

export default function Labels({ categories }) {
    const { data: transactions, isFetching, isSuccess, isError, error } = api.useGetLabelsQuery();

    let totalInvestment = 0;
    let totalExpenses = 0;
    let totalSavings = 0;
    let expensePercent = 0;
    let savingsPercent = 0;

    if (isFetching) {
        return <div>Loading labels...</div>;
    } else if (isError) {
        return <div>Error: {error?.message || 'Failed to load labels data'}</div>;
    } else if (isSuccess && transactions && categories) {
        // Calculate totals
        const labelsData = getLabels(transactions, categories);
        totalInvestment = labelsData.find(d => d.type === 'Savings')?.total + labelsData.find(d => d.type === 'Expense')?.total || 0;
        totalExpenses = labelsData.find(d => d.type === 'Expense')?.total || 0;
        totalSavings = totalInvestment - totalExpenses;

        if (totalInvestment !== 0) {
            expensePercent = (100 * totalExpenses) / totalInvestment;
            savingsPercent = (100 * totalSavings) / totalInvestment;
        }
    }

    return (
        <div className="flex flex-col py-4 gap-4">
            <div className="item flex justify-between items-center bg-gray-50 py-2 px-4 rounded-md shadow-sm">
                <span className="font-bold">Investment:&nbsp;&nbsp;</span>
                <span className="text-blue-900" style={{ color: colors.investment, fontWeight: 'bold' }}>
                    <span>&#8377;</span> {totalInvestment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({100}%)
                </span>
            </div>
            <div className="item flex justify-between items-center bg-gray-50 py-2 px-4 rounded-md shadow-sm">
                <span className="font-bold">Expenses:    </span>
                <span className="text-pink-600" style={{ color: colors.expenses, fontWeight: 'bold' }}>
                    <span>&#8377;</span> {totalExpenses.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({expensePercent.toFixed(2)}%)
                </span>
            </div>
            <div className="item flex justify-between items-center bg-gray-50 py-2 px-4 rounded-md shadow-sm">
                <span className="font-bold">Savings:   </span>
                <span className="text-green-600" style={{ color: colors.savings, fontWeight: 'bold' }}>
                    <span>&#8377;</span> {totalSavings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({savingsPercent.toFixed(2)}%)
                </span>
            </div>
        </div>
    );
}
