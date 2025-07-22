
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../store/apiSlice';
import { setToken } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const loginResponse = await login(data).unwrap();
      dispatch(setToken({
        token: loginResponse.token,
        user: loginResponse.user,
      }));
      navigate('/ExpenseTracker', { replace: true });
    } catch (err) {
      setError(err?.data?.message || 'Login failed! Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md relative">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/home')}
          className="absolute top-4 left-4 text-blue-600 hover:underline"
        >
          &larr; Back
        </button>

        <h2 className="text-2xl font-bold text-gray-800 text-center mt-6">Welcome Back</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Please enter your credentials to log in.</p>
        {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register('password')}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-500"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
