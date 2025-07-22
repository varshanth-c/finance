// store/transactionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserTransactions = createAsyncThunk(
  'transactions/fetchUserTransactions',
  async (userId) => {
    // Your API call here
    const response = await fetch(`/api/transactions/${userId}`);
    return response.json();
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    isLoading: false,
    error: null
  },
  reducers: {
    clearTransactions: (state) => {
      state.transactions = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});
export const { clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;