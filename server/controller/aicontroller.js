const { GoogleGenerativeAI } = require('@google/generative-ai');
const Transaction = require('../models/model').Transaction;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeSpending(req, res) {
    try {
        // Get user's transactions
        const transactions = await Transaction.find({ userId: req.user.userId })
            .sort({ date: -1 })
            .limit(50);

        if (transactions.length === 0) {
            return res.json({
                analysis: "No transaction data available for analysis.",
                recommendations: "Start tracking your expenses to get personalized insights."
            });
        }

        // Process transactions for different classifications
        const spendingByCategory = {};
        const recurringTransactions = [];
        const oneTimeTransactions = [];
        let totalSpent = 0;
        let totalIncome = 0;

        transactions.forEach(transaction => {
            const category = transaction.type || 'Uncategorized';
            const amount = transaction.amount;

            // Categorize spending and income
            if (category === 'Income') {
                totalIncome += amount;
            } else {
                spendingByCategory[category] = (spendingByCategory[category] || 0) + amount;
                totalSpent += amount;
            }

            // Separate recurring and one-time transactions
            if (transaction.isRecurring) {
                recurringTransactions.push(transaction);
            } else {
                oneTimeTransactions.push(transaction);
            }
        });

        // Create detailed prompt for Gemini
        const prompt = `As an advanced financial analyst, provide a comprehensive analysis of the following transaction data:

TRANSACTION DETAILS:
${transactions.map(t => `
Name: ${t.name}
Type: ${t.type}
Amount: $${t.amount}
Date: ${new Date(t.date).toLocaleDateString()}
Notes: ${t.notes.map(n => n.text).join(' ')}
---`).join('\n')}

SUMMARY STATISTICS:
Total Income: $${totalIncome}
Total Expenses: $${totalSpent}
Net Position: $${totalIncome - totalSpent}

Spending by Category:
${Object.entries(spendingByCategory)
    .map(([category, amount]) => `${category}: $${amount}`)
    .join('\n')}

Please provide a detailed analysis in the following format:

1. TRANSACTION CLASSIFICATION:
- Analyze spending patterns across different categories
- Identify high-value transactions and their context
- Evaluate recurring vs one-time expenses
- Create a spending hierarchy table

2. FINANCIAL BEHAVIOR ANALYSIS:
- Analyze the timing and frequency of transactions
- Evaluate the balance between essential and discretionary spending
- Assess investment and saving patterns
- Identify emotional patterns in spending (based on transaction notes)

3. RISK AND OPPORTUNITY ASSESSMENT:
- Highlight potential areas of overspending
- Identify opportunities for cost optimization
- Assess the sustainability of spending patterns
- Evaluate investment decisions

4. DETAILED RECOMMENDATIONS:
- Category-specific optimization strategies
- Budgeting advice based on spending patterns
- Investment and savings suggestions
- Specific actionable steps for financial improvement

5. FUTURE PLANNING:
- Long-term financial strategy suggestions
- Investment diversification recommendations
- Risk management strategies
- Future spending optimization opportunities

Present the analysis in clear, professional language with specific examples from the transaction data. Include tables where appropriate for better visualization of data patterns.`;

        // Call Gemini API
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse and structure the response
        const sections = text.split(/\d\.\s+/).filter(Boolean);
        
        res.json({
            transactionClassification: sections[0]?.trim() || '',
            behaviorAnalysis: sections[1]?.trim() || '',
            riskAssessment: sections[2]?.trim() || '',
            recommendations: sections[3]?.trim() || '',
            futurePlanning: sections[4]?.trim() || ''
        });

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ 
            error: 'Failed to generate financial insights',
            details: error.message
        });
    }
}

module.exports = {
    analyzeSpending
};