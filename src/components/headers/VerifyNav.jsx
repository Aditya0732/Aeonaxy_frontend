import React, { useState } from 'react'
import { BsBagXFill } from 'react-icons/bs'
import { IoIosSearch, IoMdMenu } from 'react-icons/io'
import { useSelector } from 'react-redux';

const VerifyNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const selectedImage = useSelector(state => state.info.selectedImage);
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className="flex justify-between p-4 border-b border-b-[#E0E0E0] text-sm">
        <div className="flex items-center space-x-4">
          <img src="/wordmark.svg" alt="logo" className="w-20 font-bold" />
          <div className="hidden lg:flex space-x-4">
            <h1 className="text-[#616167] hover:text-[#EA4C89] cursor-pointer">Inspiration</h1>
            <h1 className="text-[#616167] hover:text-[#EA4C89] cursor-pointer">Find work</h1>
            <h1 className="text-[#616167] hover:text-[#EA4C89] cursor-pointer">Learn Design</h1>
            <h1 className="text-[#616167] hover:text-[#EA4C89] cursor-pointer">Go Pro</h1>
            <h1 className="text-[#616167] hover:text-[#EA4C89] cursor-pointer">Hire Designers</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative ">
            {searchVisible && (
              <>
                <IoIosSearch size={18} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#616167] hover:text-[#EA4C89] cursor-pointer" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-[#F3F3F4] rounded-lg pl-6 py-1 text-sm focus:outline-none"
                />
              </>
            )}
          </div>
          <div className="relative md:flex hidden">
            <IoIosSearch size={18} className="hover:text-[#EA4C89] cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2 text-[#616167]" />
            <input
              type="text"
              placeholder="Search"
              className="bg-[#F3F3F4] rounded-lg pl-8 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="md:hidden">
            <IoIosSearch size={24} className=" text-[#616167] hover:text-[#EA4C89] cursor-pointer" onClick={toggleSearch} />
          </div>
          {!searchVisible && (
            <>
              <span className='hover:text-[#EA4C89] text-[#616167] cursor-pointer'><BsBagXFill  size={20} /></span>

              {selectedImage && <img src={selectedImage} alt='profilePic' className='w-8 h-8 rounded-full object-cover' />}

              <button className="bg-[#EA4C89] rounded-lg text-white px-4 py-2 hover:scale-105 duration-300 hidden md:block">Upload</button>
              <div className="lg:hidden">
                <button onClick={toggleMenu}>
                  <IoMdMenu size={24} className="text-[#616167]" />
                </button>
              </div>
            </>
          )}

          <div className="lg:hidden">
            {menuOpen && (
              <div className="absolute top-16 right-0 bg-white border border-[#E0E0E0] rounded-lg shadow-lg">
                <div className="p-2">
                  <h1 className="text-[#616167]">Inspiration</h1>
                  <h1 className="text-[#616167]">Find work</h1>
                  <h1 className="text-[#616167]">Learn Design</h1>
                  <h1 className="text-[#616167]">Go Pro</h1>
                  <h1 className="text-[#616167]">Hire Designers</h1>
                </div>
              </div>
            )}
          </div>


        </div>
      </div>
  )
}

export default VerifyNav;