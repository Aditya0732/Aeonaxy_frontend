import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiSolidError } from 'react-icons/bi';
import { LuDot } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { setFormData, setErrors, setShowToast, setToastMessage } from '../redux/actions/signUpSlice';
import { setAccessToken, setUser } from '../redux/actions/authSlice';
import api from '../api/api';
import { setLoader } from '../redux/actions/infoSlice';
import axios from 'axios';

const SignUpForm = () => {
    const formData = useSelector((state) => state.signUp.formData);
    const errors = useSelector((state) => state.signUp.errors);
    const showToast = useSelector((state) => state.signUp.showToast);
    const toastMessage = useSelector((state) => state.signUp.toastMessage);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        dispatch(setFormData({ ...formData, [name]: newValue }));
        // Remove error for the field being edited
        dispatch(setErrors({ ...errors, [name]: '' }));
    };

    // axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        // Validate required fields
        if (!formData.name) {
            newErrors.name = 'Name is required !';
        }
        if (!formData.userName) {
            newErrors.userName = 'Username is required !';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required !';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address !';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required !';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password length must be more than 6 characters !';
        }
        if (!formData.terms) {
            newErrors.terms = 'Please accept the terms !';
        }
        // Check if there are any errors
        if (Object.keys(newErrors).length > 0) {
            dispatch(setErrors(newErrors));
            return;
        }
        // If no errors, submit the form
        try {
            dispatch(setLoader(true));
            const response = await api.post('/signup', formData);
            dispatch(setLoader(false));
            const { accessToken } = response.data;
            const user = response.data.user;
            dispatch(setAccessToken(accessToken));
            dispatch(setUser(user));
            dispatch(setShowToast(true));
            dispatch(setToastMessage('Successfully Signed up !'));
            setTimeout(() => {
                dispatch(setShowToast(false));
                dispatch(setToastMessage(''));
            }, 3000);
            navigate(`/addPhoto`);
        } catch (error) {
            dispatch(setLoader(false));
            if (error.response) {
                const { status, data } = error.response;
                if (status === 409) {
                    if (data.message === 'Email is already registered') {
                        dispatch(setErrors({ email: 'Email is already registered' }));
                    } else if (data.message === 'Username is already taken') {
                        dispatch(setErrors({ userName: 'Username is already taken' }));
                    } else {
                        console.error('Unhandled conflict error:', data);
                    }
                } else {
                    console.error('Server error:', data);
                    dispatch(setErrors({ server: 'Sorry, we are currently experiencing technical difficulties. Please try again later.' }));
                }
            } else {
                console.error('Network error:', error.message);
                dispatch(setErrors({ server: 'Sorry, we are currently experiencing technical difficulties. Please try again later.' }));
            }
        }
    };

    return (
        <div className='block'>
            {showToast && (
                <div className="bg-[#EA4C89] text-white p-4 rounded-lg mb-4 fixed bottom-1 right-1 shadow-md border-t-4 border-t-white" role="alert">
                    <span className="block sm:inline text-lg">{toastMessage}</span>
                </div>
            )}
            {Object.keys(errors).length > 0 && (
                <div className='flex flex-col'>
                    {Object.entries(errors).map(([field, error], index) => (
                        error && ( // Only display if error message is not empty
                            <h1 key={index} className='text-red-400 text-sm flex items-center gap-1'>
                                <LuDot size={20} />
                                {error}
                            </h1>
                        )
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-6 mt-6'>
                    <div className='flex flex-col gap-6 w-full'>
                        <div className='block'>
                            <h1 className='font-bold text-sm flex items-center'>
                                {errors.name && <BiSolidError size={16} className='text-red-400 mr-1 rounded-lg' />}
                                Name
                            </h1>
                            <input
                                name='name'
                                id='name'
                                type='text'
                                placeholder='Name'
                                className={`rounded-md bg-[#F3F3F4] p-2 text-sm w-full focus:outline-none ${errors.name && 'bg-red-100 text-red-400'}`}
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='block'>
                            <h1 className='font-bold text-sm flex items-center'>
                                {errors.userName && <BiSolidError size={16} className='text-red-400 mr-1 rounded-lg' />}
                                Username
                            </h1>
                            <input
                                name='userName'
                                id='userName'
                                type='text'
                                placeholder='Username'
                                className={`rounded-md bg-[#F3F3F4] p-2 text-sm w-full focus:outline-none ${errors.userName && 'bg-red-100 text-red-400'}`}
                                value={formData.userName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <h1 className='font-bold text-sm flex items-center'>
                            {errors.email && <BiSolidError size={16} className='text-red-400 mr-1 rounded-lg' />}
                            Email
                        </h1>
                        <input
                            name='email'
                            id='email'
                            type='text'
                            placeholder='Email'
                            className={`rounded-md bg-[#F3F3F4] p-2 text-sm w-full focus:outline-none ${errors.email && 'bg-red-100 text-red-400'}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-bold text-sm flex items-center'>
                            {errors.password && <BiSolidError size={16} className='text-red-400 mr-1 rounded-lg' />}
                            Password
                        </h1>
                        <input
                            name='password'
                            id='password'
                            type='password'
                            placeholder='6+ Character'
                            className={`rounded-md bg-[#F3F3F4] p-2 text-sm w-full focus:outline-none ${errors.password && 'bg-red-100 text-red-400'}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className='flex gap-2 '>
                            <div className='w-fit'>
                                <input
                                    name='terms'
                                    id='terms'
                                    type='checkbox'
                                    className='w-4 h-4 border border-[#E0E0E0] rounded'
                                    checked={formData.terms}
                                    onChange={handleChange}
                                />
                            </div>
                            <p className='text-[#6E6D7A] text-sm'>Creating an account means you're okay with our <span className='text-[#4F3CC9] cursor-pointer'>Terms of Service, Privacy Policy</span>, and our default <span className='text-[#4F3CC9] cursor-pointer'>Notification Settings.</span></p>
                        </div>
                        <div className='flex gap-3'>
                            <button type="submit" className="bg-[#EA4C89] rounded-xl text-white px-4 py-2 hover:scale-105 duration-300 mt-6 w-full md:w-auto">Create Account</button>
                            {user && (
                                <Link to="/addPhoto">
                                    <button type="submit" className="bg-[#585858] rounded-xl text-white px-4 py-2 hover:scale-105 duration-300 mt-6 w-full md:w-auto">Next</button>
                                </Link>
                            )}
                        </div>
                        <p className='text-[#6E6D7A] text-sm mt-4'>This site is protected by reCAPTCHA and the Google <span className='text-[#4F3CC9] cursor-pointer'>Privacy Policy</span> and <span className='text-[#4F3CC9] cursor-pointer'>Terms of Service</span> apply.</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
