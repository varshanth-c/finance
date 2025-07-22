import React from 'react';
import { useGetAIInsightsQuery } from '../store/apiSlice';
import { TrendingUp, Loader } from 'lucide-react';

const FinancialInsights = () => {
  const { data: insights, isLoading, error, refetch } = useGetAIInsightsQuery();

  const handleAnalysis = () => {
    refetch();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Financial Insights</h2>
        </div>
        <button
          onClick={handleAnalysis}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Get Insights'
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error.data?.details || 'Failed to fetch insights. Please try again.'}
        </div>
      )}

      {insights && (
        <div className="space-y-6">
          {insights.transactionClassification && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Transaction Classification</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {insights.transactionClassification}
              </div>
            </div>
          )}
          {insights.behaviorAnalysis && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Behavior Analysis</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {insights.behaviorAnalysis}
              </div>
            </div>
          )}
          {insights.riskAssessment && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Risk Assessment</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {insights.riskAssessment}
              </div>
            </div>
          )}
          {insights.recommendations && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Recommendations</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {insights.recommendations}
              </div>
            </div>
          )}
          {insights.futurePlanning && (
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Future Planning</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {insights.futurePlanning}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialInsights;