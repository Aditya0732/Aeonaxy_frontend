import React from 'react'
import UserProfileIcon from '../UserProfileIcon'

const Usernav = () => {
    return (
        <div className='p-1 flex justify-end items-center bg-[#f8f8f5] border-b border-b-[#e8e7e3]'>
            <div className='flex gap-1 items-center mr-10'>
                <UserProfileIcon className="rounded-full h-6 w-6 object-cover" />
                <h1 className='text-sm'>My Account</h1>
            </div>
        </div>
    )
}

export default Usernav