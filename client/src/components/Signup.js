import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../store/apiSlice';
import { setToken } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

// High-complexity email regex for robust validation
const complexEmailRegex = /^(?=.{1,64}@)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?=.{4,255}$)(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/;

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().regex(complexEmailRegex, 'Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must include at least one uppercase letter')
    .regex(/[a-z]/, 'Must include at least one lowercase letter')
    .regex(/\d/, 'Must include at least one number')
    .regex(/[!@#$%^&*]/, 'Must include at least one special character'),
});

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      setServerError(null);
      const response = await registerUser(data).unwrap();
      dispatch(setToken(response.token));

      // Show success alert and redirect after 3 seconds
      setRegistrationSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (err) {
      setServerError(err?.data?.message || 'Signup failed! Please try again.');
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

        <h2 className="text-2xl font-bold text-gray-800 text-center mt-6">Sign Up</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Create an account to get started.</p>

        {registrationSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Registration complete. Redirecting to home page...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {serverError && <div className="text-red-600 text-sm mb-4 text-center">{serverError}</div>}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input 
                {...register("username")}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                {...register("email")}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                {...register("password")}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none ${isLoading ? 'opacity-50' : ''}`}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
