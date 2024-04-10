import React from 'react'

const Footer = () => {
    return (
        <div className='block mt-10 bg-[#F3F3F4] p-6'>
            <div className=' text-sm p-4 flex flex-wrap justify-center border-b border-[#E0E0E0]'>
                <div className='flex w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex-col gap-4'>
                    <img src="/wordmark.svg" alt="logo" className="w-20 font-bold" />
                    Dribbble is the world's leading community for creatives.
                </div>
                <div className='flex w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex-col gap-4'>
                    <h1 className='font-semibold'>For designers</h1>
                    <h1>Go Pro!</h1>
                    <h1>Explore design work</h1>
                    <h1>Design blog</h1>
                    <h1>overtime podcast</h1>
                    <h1>Playoffs</h1>
                    <h1>Weekly Warm-up</h1>
                    <h1>Refer a Friend</h1>
                </div>
                <div className='flex w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex-col gap-4'>
                    <h1 className='font-semibold'>Hire designers</h1>
                    <h1>Post a job opening</h1>
                    <h1>Post a freelance project</h1>
                    <h1>Search for designers</h1>
                    <h1 className='font-semibold'>Brands</h1>
                    <h1>Advertise with us</h1>
                </div>
                <div className='flex w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex-col gap-4'>
                    <h1 className='font-semibold'>Company</h1>
                    <h1>About</h1>
                    <h1>Careers</h1>
                    <h1>Support</h1>
                    <h1>Media kit</h1>
                    <h1>Testimonials</h1>
                    <h1>Api</h1>
                    <h1>Terms of service</h1>
                    <h1>Privacy policy</h1>
                    <h1>Cookie policy</h1>
                </div>
                <div className='flex w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex-col gap-4'>
                    <h1 className='font-semibold'>Directories</h1>
                    <h1>Design jobs</h1>
                    <h1>Designers for hire</h1>
                    <h1>Freelance designers for hire</h1>
                    <h1>Tags</h1>
                    <h1>Places</h1>
                    <h1 className='font-semibold'>Design assets</h1>
                    <h1>Dribble Marketplace</h1>
                    <h1>Creative Market</h1>
                    <h1>Fontspring</h1>
                    <h1>Font Squirrel</h1>
                </div>
                <div className='flex w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex-col gap-4'>
                    <h1 className='font-semibold'>Design Resources</h1>
                    <h1>Freelancing</h1>
                    <h1>Design Hiring</h1>
                    <h1>Design Portfolio</h1>
                    <h1>Design Education</h1>
                    <h1>Creative Process</h1>
                    <h1>Design Industry Trends</h1>
                </div>
            </div>
            <div className='flex justify-between p-4'>
                <h1 className='text-xs'>2023 Dribbble. All rights reserved.</h1>
                <h1 className='text-xs'><span className='font-semibold'>20,501,853</span> shots dribbbled</h1>
            </div>
        </div>
    )
}

export default Footer