import React, { useState, useEffect, useCallback } from 'react';
import Graph from './Graph';
import Form from './Form';
import HistoryDrawer from './HistoryDrawer';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAIAnalysisMutation } from '../store/apiSlice';
import { TrendingUp, Loader, X, History } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { clearTransactions, fetchUserTransactions } from '../store/transactionSlice';
import 'normalize.css';
import '../App3.css';

const InsightsDrawer = ({ isOpen, onClose }) => {
  const [getAnalysis, { data: insights, isLoading, error }] = useGetAIAnalysisMutation();

  const handleAnalysis = async () => {
    try {
      await getAnalysis().unwrap();
    } catch (err) {
      console.error("Failed to get insights:", err);
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

      {/* Drawer Container */}
      <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
        {/* Drawer */}
        <div 
          className={`absolute inset-y-0 left-0 pointer-events-auto w-full md:w-2/3 lg:w-1/2 bg-white shadow-xl 
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Financial Insights</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <button
                onClick={handleAnalysis}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                         disabled:opacity-50 flex items-center justify-center gap-2 mb-6"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Generate New Insights'
                )}
              </button>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
                  {error.data?.details || 'Failed to fetch insights. Please try again.'}
                </div>
              )}

              {insights && (
                <div className="space-y-4">
                  {insights.analysis && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 text-gray-800">Analysis</h3>
                      <div className="text-gray-700 whitespace-pre-line">
                        {insights.analysis}
                      </div>
                    </div>
                  )}

                  {insights.recommendations && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 text-gray-800">Recommendations</h3>
                      <div className="text-gray-700 whitespace-pre-line">
                        {insights.recommendations}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function ExpenseTracker() {
  const [showHistory, setShowHistory] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const currentUser = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Add effect to handle user changes
  useEffect(() => {
    // This will run whenever the user changes
    if (currentUser?.id) {
      // Fetch transactions for the current user
      dispatch(clearTransactions()); // Clear existing transactions first
      // Assuming you have an action to fetch transactions
      // dispatch(fetchUserTransactions(currentUser.id));
    }
  }, [currentUser?.id, dispatch]);

  return (
    <div className="container mx-auto max-w-8xl text-center drop-shadow-lg text-white-rounded">
      <Link to="/home">
        <h1 className="text-2xl mb-8 text-#666666">TrackMe</h1>
      </Link>
      
      
      
      <div className="px-6 flex justify-between items-center mb-6">
        <button 
          onClick={() => setShowInsights(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <TrendingUp className="w-4 h-4" />
          Financial Insights
        </button>
        
        <button 
          onClick={() => setShowHistory(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <History className="w-4 h-4" />
          View History
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Graph key={currentUser?.id} /> {/* Add key to force re-render */}
        <Form key={`form-${currentUser?.id}`} /> {/* Add key to force re-render */}
      </div>

      <InsightsDrawer 
        isOpen={showInsights}
        onClose={() => setShowInsights(false)}
      />

      <HistoryDrawer 
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </div>
  );
}