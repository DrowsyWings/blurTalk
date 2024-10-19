import React, { useState } from 'react'
import logo from "../assets/dragons.png"
import { Link, useNavigate } from 'react-router-dom'
import plus from "../assets/plus-icon.svg"
import arrowIcon from "../assets/arrowIcon.svg"
import userIcon from "../assets/userIcon.svg"

function Header() {
    const navigate = useNavigate();

    const [seen,setSeen]=useState(false);

    const handleClick =()=>{
        setSeen(false);
        localStorage.clear("blur-talk-user");
        console.log("User logged out!!")
        navigate("/login");
    }

    const handleProfile=()=>{
        setSeen(!seen);
    }

  return (
    <div className='bg-[#1a1a35] py-[0.5rem] px-[1rem] flex items-center justify-between relative font-poppins text-white'>
        {seen && (
                <div className='absolute top-[70px] right-4 flex flex-col gap-4 justify-center items-center bg-[#24244f] px-6 py-6 rounded-xl'>
                    <Link to="/profile">
                        <div className='flex justify-center items-center gap-4'>
                            <span className='text-[14px]'>View Profile</span>
                            <img src={arrowIcon} className='w-4'></img>
                        </div>
                    </Link>
                    <button onClick={handleClick}>
                        <div className='flex justify-center items-center gap-4 w-[90%]'>
                            <span className='text-[14px]'>Logout</span>
                            <img src={arrowIcon} className='w-4'></img>
                        </div>
                    </button>
                </div>
        )}
            <div className='flex items-center gap-[1rem]'>
                <img src={logo} alt="logo" className='h-[2.5rem] rounded-full'/>
                <h1 className='text-white text-2xl font-semibold'>BlurTalk</h1>
            </div>
            <div className='flex items-center justify-center gap-10'>
                <Link to="/publish">
                <button className='text-white text-[16px] flex justify-center items-center gap-2 border-white bg-[#4e0eff] px-3 py-1 rounded-md hover:opacity-80 active:opacity-60'>
                    <img src={plus} className='h-[1rem]'></img>
                    <span>Post</span>
                </button>
                </Link>
                <Link to="">
                <button onClick={handleProfile}>
                    <img src={userIcon} alt="logo" className='h-[2.5rem] rounded-full'/>
                </button>
                </Link>
            </div>
        </div>
  )
}

export default Header
