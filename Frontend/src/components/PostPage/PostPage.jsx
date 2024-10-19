import React from 'react'
import logo from "../../assets/dragons.png"
import { Link, useNavigate } from 'react-router-dom'
import plus from "../../assets/plus-icon.svg"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react"
import Header from '../Header.jsx'
import Corusel from './Corusel.jsx';
import Sidebar from '../Sidebar.jsx';


function PostPage() {
    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem("blur-talk-user")) {
          navigate("/login");
        }
      }, []);

    
    const handleClick =()=>{
        localStorage.clear("blur-talk-user");
        console.log("User logged out!!")
        navigate("/login");
    }


  return (
    <div className='bg-[#131324] h-[100vh] font-poppins'>
        <Header></Header>
        <div className='flex w-full'>
          <Sidebar></Sidebar>
          <div className='w-full flex justify-center items-center'>
            <Corusel></Corusel>
          </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default PostPage
