const { GoogleGenerativeAI } = require('@google/generative-ai');
const Transaction = require('../models/model').Transaction;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeSpending(req, res) {
    try {
        // Get user's transactions with basic error handling
        const transactions = await Transaction.find({ userId: req.user.userId })
            .sort({ date: -1 })
            .limit(30); // Reduced limit for simpler processing

        if (!transactions || transactions.length === 0) {
            return res.json({
                analysis: "No transaction data available for analysis.",
                recommendations: "Start tracking your expenses to get personalized insights.",
                summary: "Add some transactions to begin your financial analysis."
            });
        }

        // Simple data processing with safe defaults
        let totalIncome = 0;
        let totalExpenses = 0;
        const categories = {};
        
        // Process transactions safely
        const processedTransactions = transactions.map(transaction => {
            // Safe data extraction with defaults
            const name = transaction.name || 'Unknown Transaction';
            const type = transaction.type || 'Other';
            const amount = Number(transaction.amount) || 0;
            const date = transaction.date ? new Date(transaction.date).toLocaleDateString() : 'Unknown Date';
            
            // Calculate totals
            if (type.toLowerCase() === 'income') {
                totalIncome += amount;
            } else {
                totalExpenses += amount;
                categories[type] = (categories[type] || 0) + amount;
            }
            
            return { name, type, amount, date };
        });

        // Create simple summary data
        const topCategories = Object.entries(categories)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([category, amount]) => `${category}: $${amount.toFixed(2)}`)
            .join(', ');

        // Very simple and safe prompt
        const prompt = `Analyze this spending data and provide brief insights:

FINANCIAL SUMMARY:
- Total Income: $${totalIncome.toFixed(2)}
- Total Expenses: $${totalExpenses.toFixed(2)}
- Net Balance: $${(totalIncome - totalExpenses).toFixed(2)}
- Top Spending Categories: ${topCategories || 'No categories found'}
- Number of Transactions: ${processedTransactions.length}

RECENT TRANSACTIONS:
${processedTransactions.slice(0, 10).map(t => 
    `• ${t.name} - ${t.type} - $${t.amount.toFixed(2)} (${t.date})`
).join('\n')}

Please provide:
1. A short summary of spending patterns
2. 3 simple recommendations for better financial management
3. One main insight about their financial behavior

Keep the response concise and easy to understand.`;

        // Call Gemini API with error handling
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash", // Using flash for faster response
            generationConfig: {
                maxOutputTokens: 800, // Limit response length
                temperature: 0.7,
            }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Simple response structure
        res.json({
            success: true,
            analysis: text,
            summary: {
                totalIncome: totalIncome.toFixed(2),
                totalExpenses: totalExpenses.toFixed(2),
                netBalance: (totalIncome - totalExpenses).toFixed(2),
                transactionCount: processedTransactions.length,
                topCategories: Object.entries(categories)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 3)
            }
        });

    } catch (error) {
        console.error('Financial Analysis Error:', error);
        
        // Better error handling
        const errorMessage = error.message || 'Unknown error occurred';
        
        res.status(500).json({ 
            success: false,
            error: 'Failed to generate financial insights',
            details: process.env.NODE_ENV === 'development' ? errorMessage : 'Internal server error',
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = {
    analyzeSpending
};