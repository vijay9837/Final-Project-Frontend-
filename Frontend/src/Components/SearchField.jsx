import React from 'react'
import { IoIosSearch } from "react-icons/io";

const SearchBox = () => {
  return (
    <div className='lg:w-full border-2 rounded-full px-2 lg:py-2  flex justify-center items-center relative'>
        <input type="text" placeholder='Search...' className='w-full border-0 outline-0 lg:mx-2' />
        <IoIosSearch  className='absolute right-2 lg:text-2xl'/>
    </div>
  )
}

export default SearchBox