import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/slices/userSlice";


const EditProfile = () =>{

  const user = useSelector((store)=>{return store.user});
  const dispatch = useDispatch();
  const [firstName,setFirstName] = useState(user.firstName);
  const [lastName,setLastName] = useState(user.lastName)
  const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
  const [about,setAbout] = useState(user.about);
  const [age,setAge] = useState(user.age);
  const [gender,setGender] = useState(user.gender);
  const [updateError,setUpdateError] = useState(null);
  const [showToast,setShowToast] = useState(false);

  const profileUpdate = async() =>{
    setUpdateError("")
    try {
    const resp = await axios.patch(`${BASE_URL}/profile/edit`,{firstName,lastName,photoUrl,about,age,gender},{withCredentials:true});
    dispatch(addUser(resp.data.data));
    setShowToast(true);
    setTimeout(()=>{
      setShowToast(false)
    },3000)
    } catch (error) {
      setUpdateError(error.message)
      console.log(error);
    }

  }


    return user && (
      <>
      <div>
<div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
  <div className="card w-full max-w-sm bg-base-100 shadow-2xl border border-base-300">
    <div className="card-body gap-5">
      {/* Title */}
      <h2 className="card-title text-2xl font-bold justify-center text-base-content">
        Edit Profile
      </h2>

      {/* Form Content */}
      <div className="flex flex-col gap-4">
        {/* Email Field */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-sm font-semibold">First Name</legend>
          <input 
            type="text" 
            className="input input-bordered w-full"
           onChange={(e)=>{setFirstName(e.target.value)}}
            placeholder={firstName}
          />
        </fieldset>

        {/* Password Field */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-sm font-semibold">Last Name</legend>
          <input 
            type="text" 
            className="input input-bordered w-full" 
            onChange={(e)=>{setLastName(e.target.value)}}
            placeholder={lastName}
          />
        </fieldset>
         <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-sm font-semibold">Photo Url</legend>
          <input 
            type="text" 
            className="input input-bordered w-full"
            onChange={(e)=>{setPhotoUrl(e.target.value)}}
            placeholder={photoUrl}
          />
        </fieldset>

        {/* Password Field */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-sm font-semibold">About</legend>
          <input 
            type="text" 
            className="input input-bordered w-full" 
            onChange={(e)=>{setAbout(e.target.value)}}
            placeholder={about}
          />
        </fieldset>
         <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-sm font-semibold">Age</legend>
          <input 
            type="text" 
            className="input input-bordered w-full"
            onChange={(e)=>{setAge(e.target.value)}}
            placeholder={age}
          />
        </fieldset>

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-sm font-semibold">Gender</legend>
          <input 
            type="text" 
            className="input input-bordered w-full" 
           onChange={(e)=>{setGender(e.target.value)}}
            placeholder={gender}
          />
        </fieldset>
      </div>
      <p className="text-red-500">{updateError}</p>
      {/* Login Action */}
      <div className="card-actions mt-2">
        <button className="btn btn-primary btn-block text-lg" onClick={profileUpdate}>
          Save Profile
        </button>
      </div>
    </div>
  </div>
</div>
<UserCard user={{firstName,lastName,photoUrl,about,age,gender}}/>
      </div>
    { showToast && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Updated Successfully.</span>
  </div>
</div> }
      </>

    )
}
export default EditProfile