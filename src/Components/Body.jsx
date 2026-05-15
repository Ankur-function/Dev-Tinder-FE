// import React from 'react'

import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/slices/userSlice"

const Body = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const user = useSelector((store)=>{return store.user})

  const fetchProfile = async() =>{
    try {
      const profile = await axios.get(`${BASE_URL}/profile/view`,{withCredentials:true})
      dispatch(addUser(profile.data))
    } catch (error) {
    if (error.status === 401 ) {
      navigate('/login')
    }else if(error.response){
      if (error.status === 400 && error.response.data.includes('jwt expired')) {
      navigate('/login')
      }
    }
    console.log(error);
    }
  }
  useEffect(()=>{
if (!user) {
    fetchProfile()
}
  },[])

  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
