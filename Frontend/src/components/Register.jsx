import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { registerRoute } from "../utils/APIroutes";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/dragons.png"

function Register() {
  const navigate = useNavigate()

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("blur-talk-user")) {
      navigate("/");
    }
  }, []);

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleValidation = () => {
    if(username === ""){
      toast.error(
        "Username is required!",
        toastOptions
      );
      return false;
    }
    else if(email === "") {
        toast.error(
            "Email is required",
            toastOptions
        );
        return false; 
    }
    else if (password === "") {
      toast.error(
        "Password is required!",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (handleValidation()) {
      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });

        if(data.statusCode === 200){
          console.log(data.message)
        }      
        navigate("/login");
      } 
      catch (error) {
        console.log(error);
        toast.error(error.message, toastOptions);
      }
      
    }
  }

  return (
    <div className='bg-[#131324] px-6 sm:px-0 w-full h-[100vh] flex flex-col justify-center gap-[1rem] items-center'>
      <form action="" onSubmit={(event) => handleSubmit(event)} className='bg-[#0b0b11] flex flex-col gap-[2rem] rounded-[2rem] px-[3rem] sm:px-[5rem] py-[2rem] sm:py-[3rem]'>
          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" className='h-[4rem] sm:h-[6rem] rounded-full'/>
            <h1 className='text-white text-3xl sm:text-4xl font-bold'>BlurTalk</h1>
          </div>
          <input
            className='bg-transparent p-[1rem] border-[#4e0eff] rounded-[0.4rem] border-[0.1rem] text-white w-[100%] text-[1rem] focus:border-[#997af0] focus:outline-none'
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => handleChange(e,setUsername)}
          />
          <input
            className='bg-transparent p-[1rem] border-[#4e0eff] rounded-[0.4rem] border-[0.1rem] text-white w-[100%] text-[1rem] focus:border-[#997af0] focus:outline-none'
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e,setEmail)}
          />
          <input
            className='bg-transparent p-[1rem] border-[#4e0eff] rounded-[0.4rem] border-[0.1rem] text-white w-[100%] text-[1rem] focus:border-[#997af0] focus:outline-none'
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e,setPassword)}
          />  
          <button type="submit" className='bg-[#4e0eff] text-white px-[3rem] py-[1rem] font-bold cursor-pointer rounded-[0.4rem] text-[1rem] hover:bg-[#4e0eff]'>REGISTER</button>
          <span className='text-white'>
            Already have an Account ? <Link to="/login" className='text-[#4e0eff] font-bold'>LOGIN</Link>
          </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Register
