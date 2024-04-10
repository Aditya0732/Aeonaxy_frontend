import React from 'react';
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
    return (
        <div className='w-full h-screen flex items-start font-[Mona-Sans,Helvetica-Neue,Helvetica,Arial,sans-serif]'>
            <div className='lg:flex hidden h-full'>
                <img src='/main.jpg' alt='main' className='w-full h-full object-cover' />
            </div>
            <div className='fixed top-2 right-2'>
                <h1 className='text-sm'>Already a member ? <span className='text-[#4F3CC9] cursor-pointer'>Sign In</span></h1>
            </div>
            <div className='flex justify-center p-10 font-[Mona-Sans,Helvetica-Neue,Helvetica,Arial,sans-serif]'>
                <div className='xl:w-1/2 lg:w-1/2 md:w-2/3 w-full'>
                    <div className='flex flex-col gap-6'>

                        <h1 className='font-[700] text-3xl text-[#0D0C22]'>Sign up to Dribbble</h1>
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
