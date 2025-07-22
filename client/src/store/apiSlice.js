import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:8080';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseURI,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token;
            console.log('Frontend Token:', token);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['categories', 'transactions', 'labels', 'auth'],
    endpoints: builder => ({
        // Authentication Endpoints
        login: builder.mutation({
            query: (credentials) => ({
                url: '/api/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response) => response,
        }),// store/apiSlice.js - Add AI endpoints
        getAIAnalysis: builder.mutation({
    query: () => ({
        url: '/api/ai/analysis',
        method: 'POST'
    }),
    transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.error || 'Failed to fetch insights'
    })
}),
        // AI Insights GET endpoint
        getAIInsights: builder.query({
            query: () => ({
                url: '/api/analyze-spending',
                method: 'GET'
            }),
            transformErrorResponse: (response) => ({
                status: response.status,
                message: response.data?.error || 'Failed to fetch insights'
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/api/logout',
                method: 'POST',
            }),
            invalidatesTags: ['auth'],
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/api/signup',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['auth'],
        }),

        // Categories
        getCategories: builder.query({
            query: () => '/api/categories',
            providesTags: ['categories'],
        }),
// Add this to your endpoints
// In apiSlice.js - Update the updateTransaction endpoint
updateTransaction: builder.mutation({
    query: ({ _id, formData }) => ({
        url: `/api/transaction/${_id}`,
        method: 'PUT',
        body: formData,
        headers: {
            // Let browser set content type with boundary
            'Content-Type': undefined  
        }
    }),
    invalidatesTags: ['transactions', 'labels'],
}),
        // Labels
        getLabels: builder.query({
            query: () => '/api/labels',
            providesTags: ['labels'],
            transformResponse: (response) => {
                console.log('Labels API Response:', response);
                return response;
            },
            transformErrorResponse: (response) => {
                console.error('Labels API Error:', response);
                return response;
            },
        }),

        // Transactions
        getTransactions: builder.query({
            query: () => '/api/transaction',
            providesTags: ['transactions'],
        }),
        addTransaction: builder.mutation({
    query: (formData) => ({
        url: '/api/transaction',
        method: 'POST',
        body: formData,
        // Remove the Content-Type header to let browser set it with boundary
        headers: {},
    }),
    invalidatesTags: ['transactions', 'labels'],
}),

        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `/api/transaction`,
                method: 'DELETE',
                body: { _id: id },
            }),
            invalidatesTags: ['transactions'],
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useGetCategoriesQuery,
    useGetLabelsQuery,
    useGetTransactionsQuery,
    useAddTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
    useGetAIAnalysisMutation,  // keep for POST if needed
    useGetAIInsightsQuery      // export the new GET hook
} = apiSlice;

export default apiSlice;