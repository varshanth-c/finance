# Finance Tracker (Expense & Investment AI Assistant)

A modern full-stack web application to track your expenses, investments, and savings, powered by AI-driven insights and actionable recommendations.

## Features
- **Expense & Investment Tracking:** Log, categorize, and visualize your financial transactions.
- **AI Insights:** Get personalized spending analysis, saving tips, and weekly action plans using Google Gemini AI.
- **Authentication:** Secure signup/login with JWT.
- **Data Visualization:** Interactive charts and category breakdowns.
- **File Uploads:** Attach receipts or documents to transactions.
- **Responsive UI:** Built with React, Tailwind CSS, and Material UI.

## Tech Stack
- **Frontend:** React, Redux, Tailwind CSS, Chart.js, Zod, React Hook Form
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Google Generative AI (Gemini)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### Setup Instructions

#### 1. Clone the repository
```bash
git clone <your-repo-url>
cd exp_traker
```

#### 2. Backend Setup
```bash
cd server
npm install
# Create a config.env file (see config.env.example)
npm start
```
- The backend runs on `http://localhost:8080` by default.

#### 3. Frontend Setup
```bash
cd ../client
npm install
npm start
```
- The frontend runs on `http://localhost:3000` by default.

#### 4. Environment Variables
- See `server/config.env` for required variables:
  - `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`

## Usage
- Register and log in.
- Add transactions (income, expenses, investments) with optional notes and file uploads.
- View your transaction history, category breakdowns, and charts.
- Click "Analyze" to get AI-powered insights, saving tips, and a 7-day action plan.
- Delete or update transactions as needed.

## Workflow Summary
1. **Input:** Fill out the transaction form (title, type, amount, notes, file).
2. **Database:** Data is securely stored and shown in your history.
3. **Labels:** Transactions are categorized (Investment, Expense, Savings) and visualized.
4. **Charts:** See your spending/investment ratios in interactive charts.
5. **AI Analysis:** Get actionable insights and a weekly plan tailored to your habits.
6. **Manage:** Delete or update entries as needed.

## License
MIT

---
*Built with ❤️ by your team.*