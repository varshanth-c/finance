import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import List from './List';
import { default as api } from '../store/apiSlice';

export default function Form() {
    const { register, handleSubmit, resetField, setValue } = useForm();
    const [addTransaction] = api.useAddTransactionMutation();
    const [prefillData, setPrefillData] = useState(null);

    const onSubmit = async (data) => {
        if (!data) return {};
        await addTransaction(data).unwrap();
        resetField('name');
        resetField('type');
        resetField('amount');
    }

    const handlePrefill = (name, type) => {
        setValue('name', name);
        setValue('type', type);
        setPrefillData({ name, type });
    }

    return (
        <div className="form max-w-sm mx-auto w-96">
            <h1 className='font-bold pb-4 text-xl'>Transaction</h1>

            <form id='form' onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input type="text" {...register('name')} placeholder='Sallary, House Rent, SIP' className='form-input' />
                    </div>
                    <select className='form-input' {...register('type')}>
                        <option value="Investment" defaultValue>Investment</option>
                        <option value="Expenses">Expenses</option>
                        <option value="Savings">Savings</option>
                    </select>
                    <div className="input-group">
                        <input type="text" {...register('amount')} placeholder='Amount' className='form-input' />
                    </div>
                    <div className="submit-btn">
                        <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
                    </div>
                </div>
            </form>

            <div className="button-group grid gap-4 mt-4">
                <button className='border py-2 text-white bg-green-500 w-full' onClick={() => handlePrefill('Food', 'Expenses')}>Food</button>
                <button className='border py-2 text-white bg-blue-500 w-full' onClick={() => handlePrefill('Transport', 'Expenses')}>Transport</button>
                <button className='border py-2 text-white bg-yellow-500 w-full' onClick={() => handlePrefill('Salary', 'Investment')}>Salary</button>
                <button className='border py-2 text-white bg-red-500 w-full' onClick={() => handlePrefill('SIP', 'Investment')}>SIP</button>
                <button className='border py-2 text-white bg-purple-500 w-full' onClick={() => handlePrefill('Rent', 'Expenses')}>Rent</button>
            </div>

            <List />
        </div>
    );
}
