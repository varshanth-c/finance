// store.js
import { configureStore } from '@reduxjs/toolkit';
import expenseSlice from './reducer';
import authSlice from './authSlice';    // Add this import
import { apiSlice } from './apiSlice';

export const store = configureStore({
    reducer: {
        Expense: expenseSlice,
        auth: authSlice,                // Add this line
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware)
});