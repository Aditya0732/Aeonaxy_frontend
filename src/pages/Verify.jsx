import React, { useEffect, useState } from 'react';
import VerifyNav from '../components/headers/VerifyNav';
import { TbMailFilled } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import api from '../api/api';
import { setUser } from '../redux/actions/authSlice';
import ChangeEmailModal from '../Modals/ChangeEmailModal';
import { setShowToast, setToastMessage } from '../redux/actions/signUpSlice';
import Footer from '../components/Footer';
import { setLoader } from '../redux/actions/infoSlice';

const Verify = () => {
  const user = useSelector(state => state.auth.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const emailToken = searchParams.get("emailToken");
  const accessToken = useSelector(state => state.auth.accessToken);
  const showToast = useSelector((state) => state.signUp.showToast);
  const toastMessage = useSelector((state) => state.signUp.toastMessage);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChangeEmail = async () => {
    try {
      dispatch(setLoader(true));
      const response = await axios.post(
        'https://aeonaxy-backend-dug0.onrender.com/api/user/resendConfirmationEmail',
        {
          email: user.email
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true, // This will include cookies in the request
        }
      );
      dispatch(setLoader(false));
      dispatch(setShowToast(true));
      dispatch(setToastMessage('Email sent again successfully !'));
      // Handle successful response
      dispatch(setUser(response.data.user));
      setTimeout(() => {
        dispatch(setShowToast(false));
        dispatch(setToastMessage(''));
    }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (user?.isVerified === true) {
          console.log("Verified user");
        } else {
          if (emailToken) {
            const response = await axios.post("https://aeonaxy-backend-dug0.onrender.com/api/verifyEmail", { emailToken });
            console.log("res", response);
            const userData = response.data.user;
            dispatch(setUser(userData));
            if (response.error) {
              console.log("verify:", response.error);
              setVerificationError(true);
            }
          }
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setVerificationError(true);
      }
    };

    verifyEmail();
  }, [emailToken, user]);

  return (
    <div className="block font-[Mona-Sans,Helvetica-Neue,Helvetica,Arial,sans-serif]">
      <VerifyNav />
      {isLoading ? (
        <div className="text-center mt-10">
          <h1>Loading...</h1>
        </div>
      ) : verificationError ? (
        <div className="text-center mt-10">
          <h1>Verification failed. Please try again later.</h1>
        </div>
      ) : user?.isVerified ? (
        <div className="text-center mt-10">
          <h1 className="font-semibold text-3xl text-[#0D0C22]">Congratulations!</h1>
          <div className="flex justify-center items-center mt-6">
            <div className="bg-[#EA4C89] rounded-full p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.293-10.293a1 1 0 00-1.414-1.414l-5 5-2-2a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l6-6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-[#616167] text-lg mt-6">Your email has been successfully verified.</h1>
          <p className="text-[#616167] mt-4">Welcome to our community! You are now a verified member.</p>
          <p className="text-[#616167] mt-2">Enjoy exclusive benefits and access to premium features.</p>
        </div>
      ) : (
        <div className='block mt-10'>
          <div className='p-6 flex justify-center'>
            <div className='flex flex-col text-center lg:w-1/2 w-5/6'>
              <h1 className='font-[700] text-3xl text-[#0D0C22]'>Please verify your email...</h1>
              <div className='flex justify-center relative'>
                <span className='text-[#9f9f9f]'><TbMailFilled size={160} /></span>
                <input
                  type='checkbox'
                  className='w-10 h-10 mt-2 rounded-full absolute top-2 right-8 border-4 border-white'
                  checked
                />
              </div>
              <h1 className=' text-[#616167] text-sm'>Please verify your email address. We've sent a confirmation email to:</h1>
              <h1 className=' text-black font-semibold mt-4'>{user.email}</h1>
              <h1 className=' text-[#616167] text-sm mt-4'>Click the confirmation link in that mail to begin using Dribbble.</h1>
              <h1 className=' text-[#616167] text-sm mt-4'>Didn't receive the email? Check your spam folder, it may have been caught by a filter. If you still don't see it, you can <span className='text-[#EA4C89] font-semibold cursor-pointer' onClick={handleChangeEmail}>resend the confirmation email</span>.</h1>
              <h1 className=' text-[#616167] text-sm mt-4'>Wrong email address? <span className='text-[#EA4C89] font-semibold cursor-pointer' onClick={openModal}>Change it</span>.</h1>
            </div>
          </div>
        </div>
      )}
      {showModal && <ChangeEmailModal onClose={closeModal} />}
      {showToast && (
        <div className="bg-[#EA4C89] text-white p-4 rounded-lg mb-4 fixed bottom-1 right-1 shadow-md border-t-4 border-t-white" role="alert">
          <span className="block sm:inline text-lg">{toastMessage}</span>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Verify;
