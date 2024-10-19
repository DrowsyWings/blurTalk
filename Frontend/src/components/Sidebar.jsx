import React from 'react'
import homeIcon from '../assets/homeIcon.svg';
import messIcon from '../assets/messageIcon.svg'
import pollIcon from '../assets/pollIcon.svg'
import dashboard from '../assets/dashboard.svg'

function Sidebar() {
  return (
        <div className='w-[18%] border-r-[0.1px] border-gray-500 h-[91.5vh] flex flex-col justify-start items-center gap-6'>
            <div className='flex justify-start items-center gap-6 w-[90%] py-4 cursor-pointer hover:border-rounded-md hover:border-[1px] hover:bg-[#1a1a35] mt-[50px]'>
              <img src={homeIcon} className='w-6 ml-6'></img>
              <span className='text-white text-xl'>Home</span>
            </div>
            <div className='flex justify-start items-center gap-6 w-[90%] py-4 cursor-pointer hover:border-[1px] hover:bg-[#1a1a35]'>
              <img src={messIcon} className='w-6 ml-6'></img>
              <span className='text-white text-xl'>Chats</span>
            </div>
            <div className='flex justify-start items-center gap-6 w-[90%] py-4 cursor-pointer hover:border-[1px] hover:bg-[#1a1a35]'>
              <img src={pollIcon} className='w-6 ml-6'></img>
              <span className='text-white text-xl'>New Poll</span>
            </div>
            <div className='flex justify-start items-center gap-6 w-[90%] py-4 cursor-pointer hover:border-[1px] hover:bg-[#1a1a35]'>
              <img src={dashboard} className='w-6 ml-6'></img>
              <span className='text-white text-xl'>Dashboard</span>
            </div>
          </div>
  )
}

export default Sidebar
