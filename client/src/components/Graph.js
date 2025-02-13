import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Labels from './Labels';
import { chart_Data, getLabels } from '../helper/helper'; // Ensure this path is correct
import { default as api } from '../store/apiSlice';
import { Tooltip } from 'react-tooltip';

Chart.register(ArcElement);



// Utility function to format numbers with appropriate suffixes
const formatNumber = (num) => {
    if(num ==1_000_000_000) return (num/1_000_000_000) + "B";
    if (num == 1_000_000) return (num / 1_000_000)+ 'M';
    if(num==1_000_00) return (num/1_000_00) + "L";
    if (num == 1_000) return (num / 1_000) + 'K';
    if(num >1_000_000_000) return Math.floor(num/1_000_000_000) + "B+";
    if(num >1_0_000_000) return Math.floor(num/1_0_000_000) + "CR+";
    if(num ==1_0_000_000) return Math.floor(num/1_0_000_000) + "CR";

    if (num > 1_000_000) return Math.floor(num / 1_000_000)+ 'M+';
    if(num>1_000_00) return Math.floor(num/1_000_00)+ "L+";
    if (num > 1_000) return Math.floor(num / 1_000) + 'K+';
    return num;
};

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
        totalExpenses = labelsData.find(d => d.type === 'Expense')?.total || 0;
        totalSavings = labelsData.find(d => d.type === 'Savings')?.total || 0;

        

        graphData = <Doughnut {...chart_Data(transactions, categories)} />;
    } else if (isError) {
        graphData = <div>Error: {error?.message || 'Failed to load chart data'}</div>;
    }

    return (
        <div className="flex justify-center max-w-xs mx-auto">
            <div className="item">
                <div className="chart relative">
                    {graphData}
                    <h3 className="mb-4 font-bold title">
                        Total Money Remaining
                        <span
                            data-tooltip-id="totalSavingsTooltip"
                            data-tooltip-content={`₹ ${totalSavings.toFixed(2)}`}
                            className="block text-2xl text-emerald-400"
                            style={{ color: totalSavings < 0 ? 'red' : 'inherit' }}
                        >
                            ₹ {formatNumber(totalSavings)}
                            {totalSavings < 0 && ' (Loss)'}
                        </span>
                        <Tooltip id="totalSavingsTooltip" place="top" type="dark" effect="solid" />
                    </h3>
                </div>
                <div className="flex flex-col py-10 gap-4">
                    {/* Labels */}
                    <Labels categories={categories} />
                </div>
            </div>
        </div>
    );
}
