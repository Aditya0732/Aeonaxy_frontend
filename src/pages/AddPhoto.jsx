import React, { useState } from 'react'
import { FaAngleDown, FaAngleRight, FaCamera } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import api from '../api/api';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAvatar, setLoader, setLocation, setSelectedImage } from '../redux/actions/infoSlice';

const AddPhoto = () => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const selectedImage = useSelector(state => state.info.selectedImage);
    const location = useSelector(state => state.info.location);
    const dispatch = useDispatch();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                dispatch(setLoader(true));
                const response = await axios.post('https://aeonaxy-a-backend.onrender.com/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true,
                    // credentials: 'include',
                });
                dispatch(setLoader(false));
                dispatch(setAvatar(response.data.filename));
                const reader = new FileReader();
                reader.onload = () => {
                    dispatch(setSelectedImage(reader.result));
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const images = [
        'https://via.placeholder.com/150/FF7F50/FFFFFF/?text=Pink+and+Orange',
        'https://via.placeholder.com/150/FF69B4/FFFFFF/?text=Pink+and+Orange',
        'https://via.placeholder.com/150/FF6347/FFFFFF/?text=Pink+and+Orange',
        'https://via.placeholder.com/150/FFA07A/FFFFFF/?text=Pink+and+Orange',
        'https://via.placeholder.com/150/FF4500/FFFFFF/?text=Pink+and+Orange'
    ];

    const handleImageClick = async (file) => {
        console.log(file);
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('https://aeonaxy-a-backend.onrender.com/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true,
                    // credentials: 'include',
                });
                // Handle successful response
                console.log('File uploaded successfully:', response.data.filename);
                dispatch(setAvatar(response.data.filename));
                const reader = new FileReader();
                reader.onload = () => {
                    dispatch(setSelectedImage(reader.result));
                };
                reader.readAsDataURL(file);
            } catch (error) {
                // Handle error
                console.error('Error uploading file:', error);
            }
        }
        dispatch(setSelectedImage(file));
    };

    const [showImages, setShowImages] = useState(false);

    const handleToggleImages = () => {
        setShowImages(!showImages);
    };

    const handleLocation = (location) => {
        dispatch(setLocation(location));
    }

    const isNextButtonEnabled = selectedImage && location;

    return (
        <div className='block'>
            <div className='flex justify-start p-8'>
                <img src='/13825.jpg' alt='logo' className='w-20 font-bold' />
            </div>
            <div className='flex justify-center p-8 font-[Mona-Sans,Helvetica-Neue,Helvetica,Arial,sans-serif]'>
                <div className='block'>
                    <div className='py-6'>
                        <h1 className='font-[700] text-4xl text-[#0D0C22]'>Welcome! Let's create your profile</h1>
                    </div>
                    <div className='pb-6'>
                        <h1 className=' text-[#616167]'>Let others get to know you better! You can do these later</h1>
                    </div>
                    <div className='py-6'>
                        <h1 className='font-[700] font-[Helvetica-Neue,Helvetica,Arial,sans-serif] text-xl text-[#0D0C22] avatar'>Add an avatar</h1>
                        <div className='flex gap-10 mt-6'>
                            <div className='avatar-container relative group'>
                                <label htmlFor='avatarInput'>
                                    {selectedImage ? (
                                        <div className='avatar-preview relative'>
                                            {/* Image */}
                                            <img src={selectedImage} alt='Avatar' className='w-full h-full rounded-full' />
                                            {/* Delete icon */}
                                            <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2 p-2 border-[3px] border-white bg-[#EA4C89] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer' onClick={() => dispatch(setSelectedImage(null))}>
                                                <RiDeleteBinLine size={18} color='white' />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='avatar-icon'>
                                            <span><FaCamera size={24} color='#9E9EA7' /></span>
                                        </div>
                                    )}
                                </label>
                                <input type='file' id='avatarInput' accept='image/*' onChange={handleImageChange} className='hidden' />
                            </div>



                            <div className='block mt-6'>
                                <label htmlFor='avatarInput' className='px-4 py-3 rounded-3xl border border-[#E0E0E0] text-sm font-[700] hover:bg-[#e7e7e8] duration-300 cursor-pointer'>
                                    Choose Image
                                </label>
                                <div className='flex gap-1 mt-6 text-[#868688] items-center cursor-pointer' onClick={handleToggleImages}>
                                    <span>{showImages ? <FaAngleDown size={14} /> : <FaAngleRight size={14} />}</span>
                                    <h3 className='text-[#868688] text-sm font-medium'>Or choose one of our defaults</h3>
                                </div>
                                <div className="images-container" style={{ maxHeight: showImages ? '1000px' : '0', overflow: 'hidden', transition: 'max-height 3s ease-in-out' }}>
                                    <div className='mt-2'>
                                        <div className='flex flex-wrap gap-1 md:gap-2'>
                                            {showImages && images.map((image, index) => (
                                                <div key={index} className=''>
                                                    <img
                                                        src={image}
                                                        alt={`Pink and Orange ${index + 1}`}
                                                        className={`w-10 rounded-full h-10 cursor-pointer ${selectedImage === image ? 'border-2 border-pink-500' : ''}`}
                                                        onClick={() => handleImageClick(image)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-6'>
                        <h1 className='font-[700] font-[Helvetica-Neue,Helvetica,Arial,sans-serif] text-xl text-[#0D0C22] avatar'>Add your location</h1>
                        <input
                            type='text'
                            placeholder='Enter a location'
                            value={location}
                            onChange={(e) => handleLocation(e.target.value)}
                            className='outline-none bg-white border-b py-2 border-b-[#E0E0E0] w-full mt-4'
                        />
                    </div>
                    <div className='py-4'>
                        <Link to="/addRole">
                            <button
                               
                                className={`bg-[#EA4C89] rounded-xl text-white md:w-auto px-16 py-2  w-full duration-300 mt-6 ${isNextButtonEnabled ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
                                disabled={!isNextButtonEnabled}
                            >
                                Next
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPhoto