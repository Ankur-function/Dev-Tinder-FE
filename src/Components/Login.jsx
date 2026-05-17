// import React from 'react'

import axios from "axios";
import { useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const firstName = useRef(null);
    const lastName = useRef(null) 
    const email = useRef(null);
    const password = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logInMessage,setLoginMessage] = useState(null)
    const [isLogin,setIsLogin] = useState(true);

    const handleLoginForm = async() => {
      try {
            const resp = await axios.post(`${BASE_URL}/signIn`,
            {email:email.current.value,password:password.current.value},
            {withCredentials:true}
        )
        dispatch(addUser(resp.data));
        navigate('/feed')
      } catch (error) {
        setLoginMessage(error.response.data)
        console.error(error)
      }
    }

    const handleSignUpForm = async() =>{
      try {        
        const resp = await axios.post(`${BASE_URL}/signUp`,{
          firstName:firstName.current.value,
          lastName:lastName.current.value,
          email:email.current.value,
          password:password.current.value
        },{withCredentials:true})
        console.log(resp);
        
        dispatch(addUser(resp.data.data))
        navigate('/profile')
      } catch (error) {
        console.error(error)
      }
    }

  return (
<div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
  <div className="card w-full max-w-sm bg-base-100 shadow-2xl border border-base-300">
    <div className="card-body gap-5">
      {/* Title */}
      <h2 className="card-title text-2xl font-bold justify-center text-base-content">
        {isLogin?"LogIn":"SignUp"}
      </h2>

      {/* Form Content */}
      <div className="flex flex-col gap-4">
         {/* First Name , Last Name Field */}
     { !isLogin && <> <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-sm font-semibold">First Name</legend>
          <input 
            type="text" 
            className="input input-bordered w-full"
            ref={firstName}
          />
        </fieldset>

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-sm font-semibold">Last Name</legend>
          <input 
            type="text" 
            className="input input-bordered w-full" 
            ref={lastName}
          />
        </fieldset>
        </>
        }
        {/* Email Field */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-sm font-semibold">Email ID</legend>
          <input 
            type="email" 
            className="input input-bordered w-full"
            ref={email}
          />
        </fieldset>

        {/* Password Field */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-sm font-semibold">Password</legend>
          <input 
            type="password" 
            className="input input-bordered w-full" 
            ref={password}
          />
         { isLogin && <div className="label justify-end p-0 pt-1">
            <a href="#" className="label-text-alt link link-hover link-primary">
              Forgot password?
            </a>
          </div>}
        </fieldset>
      </div>
      <p className="text-red-500">{logInMessage}</p>
      {/* Login Action */}
      <div className="card-actions mt-2">
        <button className="btn btn-primary btn-block text-lg" onClick={isLogin? handleLoginForm:handleSignUpForm}>
         {isLogin? 'LogIn':'SignUp'}
        </button>
      </div>
      <p className="cursor-pointer" onClick={()=>{setIsLogin(!isLogin)}}>{isLogin?'First time here? Click here to SignUp':'Already a user? Click here to Login'}</p>
    </div>
  </div>
</div>

  )
}

export default Login
