import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../store/apiSlice';
import { clearCredentials } from '../store/authSlice';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutMutation] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutMutation().unwrap();
        } finally {
            dispatch(clearCredentials());
            navigate('/home');
        }
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default Logout;