import { configureStore } from '@reduxjs/toolkit';
import expenseSlice from './reducer';  // Adjust the path as needed
import { apiSlice } from './apiSlice';        // Adjust the path as needed

export const store = configureStore({
    reducer: {
        Expense: expenseSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});
