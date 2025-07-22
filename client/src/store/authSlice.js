import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      token: localStorage.getItem('token') || null,
      user: JSON.parse(localStorage.getItem('user') || 'null'),
      isAuthenticated: !!localStorage.getItem('token')
    },
    reducers: {
      setToken: (state, action) => {
        const { token, user } = action.payload;
        state.token = token;
        state.user = user;
        state.isAuthenticated = !!token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user || {}));
      },
      clearCredentials: (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  });
export const { setToken, clearCredentials } = authSlice.actions;
export default authSlice.reducer;