import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import List from './List';
import { default as api } from '../store/apiSlice';

// Utility function to convert formatted input to number
const convertAmount = (amount) => {
    if (typeof amount === 'string') {
        
        if (amount.toLowerCase().endsWith('h')) {
            return parseFloat(amount) * 100;
        }
        if (amount.toLowerCase().endsWith('k')) {
            return parseFloat(amount) * 1000;
        }
        if (amount.toLowerCase().endsWith('l')) {
            return parseFloat(amount) * 100000;
        }
        if (amount.toLowerCase().endsWith('cr')) {
            return parseFloat(amount) * 10000000;
        }
        if (amount.toLowerCase().endsWith('m')) {
            return parseFloat(amount) * 1000000;
        }
        if (amount.toLowerCase().endsWith('b')) {
            return parseFloat(amount) * 1000000000;
        }
    }
    return parseFloat(amount);
};

export default function Form() {
    const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm();
    const [addTransaction] = api.useAddTransactionMutation();
    const [prefillData, setPrefillData] = useState(null);

    const onSubmit = async (data) => {
        if (!data) return {};
        data.amount = convertAmount(data.amount);
        await addTransaction(data).unwrap();
        resetField('name');
        resetField('type');
        resetField('amount');
    };

    const handlePrefill = (name, type) => {
        setValue('name', name);
        setValue('type', type);
        setPrefillData({ name, type });
    };

    return (
        <div className="form max-w-sm mx-auto w-96">
            <h1 className='font-bold pb-4 text-xl'>Transaction</h1>

            <div className="button-group flex flex-wrap gap-4 mb-4">
                <button className='btn3d' onClick={() => handlePrefill('Food', 'Expense')}>Food</button>
                <button className='btn3d' onClick={() => handlePrefill('Transport', 'Expense')}>Transport</button>
                <button className='btn3d' onClick={() => handlePrefill('Salary', 'Investment')}>Salary</button>
                <button className='btn3d' onClick={() => handlePrefill('SIP', 'Investment')}>SIP</button>
                <button className='btn3d' onClick={() => handlePrefill('Rent', 'Expense')}>Rent</button>
                <button className='btn3d' onClick={() => handlePrefill('Utilities', 'Expense')}>Utilities</button>
            </div>

            <form id='form' onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input 
                            type="text" 
                            {...register('name', { required: "Transaction title is required" })} 
                            placeholder='Salary, House Rent, SIP' 
                            className='form-input' 
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    <select className='form-input' {...register('type', { required: "Transaction type is required" })}>
                        <option value="" defaultValue>Select Type</option>
                        <option value="Investment">Investment</option>
                        <option value="Expense">Expenses</option>
                        <option value="Investment">Savings</option>
                    </select>
                    {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
                    <div className="input-group">
                        <input 
                            type="text" 
                            {...register('amount', { required: "Amount is required", pattern: { value: /^\d+(\.\d{1,2})?([kKmMlLbBhH])?$/, message: "Invalid amount format" } })} 
                            placeholder='Amount' 
                            className='form-input' 
                        />
                        {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message}</span>}
                    </div>
                    <div className="submit-btn">
                        <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
                    </div>
                </div>
            </form>

            <List />
        </div>
    );
}
/*
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import List from './List';
import { default as api } from '../store/apiSlice';

const convertAmount = (amount) => {
    if (typeof amount === 'string') {
        if (amount.toLowerCase().endsWith('h')) {
            return parseFloat(amount) * 100;
        }
        if (amount.toLowerCase().endsWith('k')) {
            return parseFloat(amount) * 1000;
        }
        if (amount.toLowerCase().endsWith('l')) {
            return parseFloat(amount) * 100000;
        }
        if (amount.toLowerCase().endsWith('cr')) {
            return parseFloat(amount) * 10000000;
        }
        if (amount.toLowerCase().endsWith('m')) {
            return parseFloat(amount) * 1000000;
        }
        if (amount.toLowerCase().endsWith('b')) {
            return parseFloat(amount) * 1000000000;
        }
    }
    return parseFloat(amount);
};

export default function Form() {
    const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm();
    const [addTransaction] = api.useAddTransactionMutation();
    const [prefillData, setPrefillData] = useState(null);
    const [customButtons, setCustomButtons] = useState([]);
    const [customButtonText, setCustomButtonText] = useState('');
    const [customButtonType, setCustomButtonType] = useState('');

    const onSubmit = async (data) => {
        if (!data) return {};
        data.amount = convertAmount(data.amount);
        await addTransaction(data).unwrap();
        resetField('name');
        resetField('type');
        resetField('amount');
    };

    const handlePrefill = (name, type) => {
        setValue('name', name);
        setValue('type', type);
        setPrefillData({ name, type });
    };

    const handleAddCustomButton = (e) => {
        e.preventDefault();
        if (customButtonText && customButtonType) {
            setCustomButtons([...customButtons, { name: customButtonText, type: customButtonType }]);
            setCustomButtonText('');
            setCustomButtonType('');
        }
    };

    return (
        <div className="form max-w-sm mx-auto w-96">
            <h1 className='font-bold pb-4 text-xl'>Transaction</h1>

            <div className="button-group flex flex-wrap gap-4 mb-4">
                <button className='btn3d' onClick={() => handlePrefill('Food', 'Expense')}>Food</button>
                <button className='btn3d' onClick={() => handlePrefill('Transport', 'Expense')}>Transport</button>
                <button className='btn3d' onClick={() => handlePrefill('Salary', 'Investment')}>Salary</button>
                <button className='btn3d' onClick={() => handlePrefill('SIP', 'Investment')}>SIP</button>
                <button className='btn3d' onClick={() => handlePrefill('Rent', 'Expense')}>Rent</button>
                <button className='btn3d' onClick={() => handlePrefill('Utilities', 'Expense')}>Utilities</button>
                {customButtons.map((button, index) => (
                    <button key={index} className='btn3d' onClick={() => handlePrefill(button.name, button.type)}>{button.name}</button>
                ))}
            </div>

            <form onSubmit={handleAddCustomButton} className="mb-4">
                <div className="input-group flex gap-2">
                    <input 
                        type="text" 
                        value={customButtonText}
                        onChange={(e) => setCustomButtonText(e.target.value)}
                        placeholder='Button Text' 
                        className='form-input' 
                    />
                    <select 
                        value={customButtonType}
                        onChange={(e) => setCustomButtonType(e.target.value)}
                        className='form-input'
                    >
                        <option value="" defaultValue>Select Type</option>
                        <option value="Investment">Investment</option>
                        <option value="Expense">Expenses</option>
                        <option value="Savings">Savings</option>
                    </select>
                    <button className='border py-2 px-4 text-white bg-indigo-500'>Add</button>
                </div>
            </form>

            <form id='form' onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input 
                            type="text" 
                            {...register('name', { required: "Transaction title is required" })} 
                            placeholder='Salary, House Rent, SIP' 
                            className='form-input' 
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    <select className='form-input' {...register('type', { required: "Transaction type is required" })}>
                        <option value="" defaultValue>Select Type</option>
                        <option value="Investment">Investment</option>
                        <option value="Expense">Expenses</option>
                        <option value="Savings">Savings</option>
                    </select>
                    {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
                    <div className="input-group">
                        <input 
                            type="text" 
                            {...register('amount', { required: "Amount is required", pattern: { value: /^\d+(\.\d{1,2})?([kKmMlLbBhH])?$/, message: "Invalid amount format" } })} 
                            placeholder='Amount' 
                            className='form-input' 
                        />
                        {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message}</span>}
                    </div>
                    <div className="submit-btn">
                        <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
                    </div>
                </div>
            </form>

            <List />
        </div>
    );
}
*/