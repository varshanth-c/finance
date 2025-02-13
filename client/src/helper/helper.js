/*import _ from 'lodash';
import { colors } from '../colors';
// Function to get the sum of transactions grouped by a specified type
export function getSum(transactions = [], type) {
    const sum = _(transactions)
        .groupBy(type)
        .map((objs, key) => ({
            type: key,
            color: objs[0]?.color || '#e5e5e5',
            total: _.sumBy(objs, 'amount')
        }))
        .value();

    return sum;
}

// Function to get labels for expenses and savings
export function getLabels(transactions = [], categories = []) {
    // Create a map for category colors
    const categoryMap = categories.reduce((acc, category) => {
        acc[category.type] = category.color;
        return acc;
    }, {});

    // Get the sum of transactions grouped by type
    const amountSum = getSum(transactions, 'type');

    // Check if amountSum is empty or undefined
    if (!amountSum || amountSum.length === 0) {
        console.error('No data found in getSum result.');
        return [];
    }

    // Calculate total investment and expenses
    const totalInvestment = amountSum.find(d => d.type === 'Investment')?.total || 0;
    const totalExpenses = amountSum.find(d => d.type === 'Expenses')?.total || 0;
    const totalSavings = totalInvestment - totalExpenses;

    // Debugging output
    console.log('Total Investment:', totalInvestment);
    console.log('Total Expenses:', totalExpenses);
    console.log('Total Savings:', totalSavings);

    return [
        {
            type: 'Expenses',
            color: categoryMap['Expenses'] || '#e5e5e5',
            total: totalExpenses,
            percent: totalInvestment ? (100 * totalExpenses) / totalInvestment : 0
        },
        {
            type: 'Savings',
            color: categoryMap['Savings'] || '#e5e5e5',
            total: totalSavings,
            percent: totalInvestment ? (100 * totalSavings) / totalInvestment : 0
        }
    ];
}

// Function to get chart data
export function chart_Data(transactions = [], categories = [], custom) {
    const labelsData = getLabels(transactions, categories);

    // Check if labelsData is empty or undefined
    if (!labelsData || labelsData.length === 0) {
        console.error('No data found in getLabels result.');
        return custom || {};
    }

    const dataValue = labelsData.map(item => item.total);
    const bg = labelsData.map(item => item.type === 'Investment' 
        ? colors.investment 
        : item.type === 'Expenses' 
        ? colors.expenses 
        : colors.savings
    );

    const config = {
        data: {
            datasets: [{
                data: dataValue,
                backgroundColor: bg,
                hoverOffset: 8,
                borderRadius: 10,
                spacing: 10
            }]
        },
        options: {
            cutout: 115 
        }
    };

    return custom || config;
}

// Function to get the total sum of transactions
export function getTotal(transactions = []) {
    return _.sumBy(getSum(transactions, 'type'), 'total');
}
import _ from 'lodash';
import {colors} from  '../colors';
import { AiFillStar } from 'react-icons/ai';
export function getSum(transactions = [], type) {
    const sum = _(transactions)
        .groupBy(type)
        .map((objs, key) => ({
            type: key,
            color: objs[0]?.color || '#e5e5e5',
            total: _.sumBy(objs, 'amount')
        }))
        .value();

    return sum;
}

export function getLabels(transactions = [], categories = []) {
    const categoryMap = categories.reduce((acc, category) => {
        acc[category.type] = category.color;
        return acc;
    }, {});

    const amountSum = getSum(transactions, 'type');
    const totalInvestment = amountSum.find(d => d.type === 'Investment')?.total || 0;
    const totalExpenses = amountSum.find(d => d.type === 'Expense')?.total || 0;
    const totalSavings = totalInvestment - totalExpenses;

    return [
        {
            type: 'Expense',
            color: categoryMap['Expense'] || '#e5e5e5',
            total: totalExpenses,
            percent: totalInvestment ? (100 * totalExpenses) / totalInvestment : 0
        },
        {
            type: 'Savings',
            color: categoryMap['Savings'] || '#e5e5e5',
            total: totalSavings,
            percent: totalInvestment ? (100 * totalSavings) / totalInvestment : 0
        }
    ];
}

export function chart_Data(transactions = [], categories = [], custom) {
    const labelsData = getLabels(transactions, categories);
    //const labels = labelsData.map(item => item.type);
    const dataValue = labelsData.map(item => item.total);
    //const bg = labelsData.map(item => item.color);
    const bg = labelsData.map(item => item.type === 'Investment' ? colors.investment : item.type === 'Expense' ? colors.expenses : colors.savings);
    const config = {
        data: {
             // Add labels for PolarArea chart
             
            datasets: [{
                data: dataValue,
                backgroundColor: bg,
                hoverOffset: 8,
                borderRadius: 10,
                spacing: 10
            }]
        },
        options: {
            cutout : 115 
        }
    };/*
    const config = {
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount',
                data: dataValue,
                backgroundColor: bg,
                borderColor: bg,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    *//*

    return custom || config;
}

export function getTotal(transactions = []) {
    return _.sumBy(getSum(transactions, 'type'), 'total');
}
*/
import _ from 'lodash';
import { colors } from '../colors';

export function getSum(transactions = [], type) {
    const sum = _(transactions)
        .groupBy(type)
        .map((objs, key) => ({
            type: key,
            color: objs[0]?.color || '#e5e5e5',
            total: _.sumBy(objs, 'amount')
        }))
        .value();

    return sum;
}

export function getLabels(transactions = [], categories = []) {
    const categoryMap = categories.reduce((acc, category) => {
        acc[category.type] = category.color;
        return acc;
    }, {});

    const amountSum = getSum(transactions, 'type');
    const totalInvestment = amountSum.find(d => d.type === 'Investment')?.total || 0;
    const totalExpenses = amountSum.find(d => d.type === 'Expense')?.total || 0;
    const totalSavings = totalInvestment - totalExpenses;

    return [
        {
            type: 'Expense',
            color: categoryMap['Expense'] || '#e5e5e5',
            total: totalExpenses,
            percent: totalInvestment ? (100 * totalExpenses) / totalInvestment : 0
        },
        {
            type: 'Savings',
            color: categoryMap['Savings'] || '#e5e5e5',
            total: totalSavings,
            percent: totalInvestment ? (100 * totalSavings) / totalInvestment : 0
        }
    ];
}

export function chart_Data(transactions = [], categories = [], custom) {
    const labelsData = getLabels(transactions, categories);

    // Ensure labelsData is not empty
    if (!labelsData || labelsData.length === 0) {
        console.error('No data found in getLabels result.');
        return custom || {};
    }

    const dataValue = labelsData.map(item => item.total);
    const bg = labelsData.map(item =>
        item.type === 'Investment' ? colors.investment :
        item.type === 'Expense' ? colors.expenses :
        colors.savings
    );

    const config = {
        data: {
            datasets: [{
                data: dataValue,
                backgroundColor: bg,
                hoverOffset: 8,
                borderRadius: 10,
                spacing: 10
            }]
        },
        options: {
            cutout: 115,
            responsive: true,
            plugins: {
                tooltip: {
                    // Adjust tooltip settings if necessary
                }
            }
        }
    };

    return custom || config;
}

export function getTotal(transactions = []) {
    return _.sumBy(getSum(transactions, 'type'), 'total');
}
