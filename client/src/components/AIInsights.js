import React, { useState } from 'react';
import { TrendingUp, Loader, AlertCircle, DollarSign, PieChart } from 'lucide-react';

const FinancialInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalysis = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to fetch insights');
      }

      setInsights(data);
    } catch (err) {
      console.error('Failed to get insights:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">AI Financial Insights</h2>
        </div>
        <button
          onClick={handleAnalysis}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <PieChart className="w-4 h-4" />
              Get Insights
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Analysis Failed</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {insights && (
        <div className="space-y-6">
          {/* Financial Summary */}
          {insights.summary && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Financial Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Income</p>
                  <p className="font-semibold text-green-600">${insights.summary.totalIncome}</p>
                </div>
                <div>
                  <p className="text-gray-600">Expenses</p>
                  <p className="font-semibold text-red-600">${insights.summary.totalExpenses}</p>
                </div>
                <div>
                  <p className="text-gray-600">Net Balance</p>
                  <p className={`font-semibold ${parseFloat(insights.summary.netBalance) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${insights.summary.netBalance}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Transactions</p>
                  <p className="font-semibold text-blue-600">{insights.summary.transactionCount}</p>
                </div>
              </div>
              
              {insights.summary.topCategories && insights.summary.topCategories.length > 0 && (
                <div className="mt-4">
                  <p className="text-gray-600 text-sm mb-2">Top Spending Categories:</p>
                  <div className="flex flex-wrap gap-2">
                    {insights.summary.topCategories.map(([category, amount], index) => (
                      <span key={index} className="bg-white px-2 py-1 rounded text-xs border">
                        {category}: ${amount.toFixed(2)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AI Analysis */}
          {insights.analysis && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                AI Analysis & Recommendations
              </h3>
              <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                {insights.analysis}
              </div>
            </div>
          )}
        </div>
      )}

      {!insights && !loading && !error && (
        <div className="text-center py-12 text-gray-500">
          <PieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Click "Get Insights" to analyze your financial data with AI</p>
        </div>
      )}
    </div>
  );
};

export default FinancialInsights;