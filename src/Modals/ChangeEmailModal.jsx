import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/actions/authSlice';
import { setLoader } from '../redux/actions/infoSlice';

const ChangeEmailModal = ({ onClose }) => {
    const [newEmail, setNewEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const accessToken = useSelector(state => state.auth.accessToken);
    const dispatch = useDispatch();

    const handleChangeEmail = async () => {
        try {
            dispatch(setLoader(true));
            const response = await axios.post(
                'https://aeonaxy-a-backend.onrender.com/api/user/changeEmail',
                {
                    newEmail
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true, // This will include cookies in the request
                }
            );
    
            dispatch(setLoader(false));
            dispatch(setUser(response.data.user));
            onClose();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Handle conflict error (409) - Email already in use
                setEmailError('Email address is already in use. Please choose a different email.');
            } else {
                // Handle other errors
                console.error('Error changing email:', error);
                setEmailError('An error occurred while changing email. Please try again later.');
            }
        }
    };
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleEmailChange = (e) => {
        const email = e.target.value;
        setNewEmail(email);
    
        if (emailRegex.test(email) || email === '') {
          setEmailError('');
        } else {
          setEmailError('Please provide a valid email address.');
        }
      };
      

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-lg font-semibold mb-4">Change Email Address</h1>
                <input
                    type="email"
                    value={newEmail}
                    onChange={handleEmailChange}
                    className="focus:outline-none rounded-md p-2 mb-2 w-full bg-[#F3F3F4]"
                    placeholder="New Email Address"
                />

                {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
                <div className="md:flex block gap-3 justify-center">
                    <button onClick={handleChangeEmail} disabled={!emailRegex.test(newEmail)} className={`bg-[#EA4C89] rounded-xl text-white px-4 py-2 hover:scale-105 duration-300 mt-3 w-full md:w-auto ${!emailRegex.test(newEmail) && 'opacity-50 cursor-not-allowed'}`}>Change</button>
                    <button onClick={onClose} className="bg-[#505050] rounded-xl text-white px-4 py-2 hover:scale-105 duration-300 mt-3 w-full md:w-auto">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ChangeEmailModal;
