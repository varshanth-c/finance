import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart, ArcElement, RadialLinearScale } from 'chart.js';
import Labels from './Labels';
import { chart_Data, getLabels } from '../helper/helper';
import { default as api } from '../store/apiSlice';

Chart.register(ArcElement, RadialLinearScale); // Register RadialLinearScale

export default function Graph() {
    const { data: transactions, isFetching, isSuccess, isError, error } = api.useGetLabelsQuery();
    const { data: categories } = api.useGetCategoriesQuery();

    let graphData;
    let totalInvestment = 0;
    let totalExpenses = 0;
    let totalSavings = 0;

    if (isFetching) {
        graphData = <div>Loading chart data...</div>;
    } else if (isSuccess && categories) {
        const labelsData = getLabels(transactions, categories);
        totalInvestment = labelsData.find(d => d.type === 'Investment')?.total || 0;
        totalExpenses = labelsData.find(d => d.type === 'Expenses')?.total || 0;
        totalSavings = labelsData.find(d => d.type === 'Savings')?.total || 0;

        graphData = <PolarArea {...chart_Data(transactions, categories)} />;
    } else if (isError) {
        graphData = <div>Error: {error?.message || 'Failed to load chart data'}</div>;
    }

    return (
        <div className="flex justify-center max-w-xs mx-auto">
            <div className="item">
                <div className="chart relative">
                    {graphData}
                    <h3 className="mb-4 font-bold title">
                        
                        <span className="block text-3xl text-emerald-400">
                           
                        </span>
                    </h3>
                </div>
                <div className="flex flex-col py-10 gap-4">
                    <Labels categories={categories} />
                </div>
            </div>
        </div>
    );
}

