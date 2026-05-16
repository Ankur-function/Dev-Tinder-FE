import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/slices/requestSlice";

const Requests = () =>{

    const dispatch = useDispatch();
    const requests = useSelector((store)=>{return store.request})
    const fetchAllRequests = async() => {
        try {
        const resp = await axios.get(`${BASE_URL}/user/requests/received`,{withCredentials:true});
        dispatch(addRequest(resp.data.data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchAllRequests();
    },[])

      if (!requests) return
    if (requests && requests.length === 0) return <h1>No Requests Available</h1>
    return (
               <div className="flex flex-col items-center justify-center p-4 my-10 max-w-2xl mx-auto">
  {/* Header Section */}
  <div className="text-center mb-8">
    <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
     All Requests
    </h1>
    <p className="text-sm text-base-content/60 mt-1">
      You have total {requests.length} requests
    </p>
  </div>

  {/* Connections Container */}
  <div className="w-full flex flex-col gap-4">
    {requests.map((request) => {
        const {firstName,lastName,age, gender,about,photoUrl} = request.senderUserId;
      return (
        <div 
          key={request._id} 
          className="flex flex-col sm:flex-row items-center gap-4 bg-base-100 p-5 rounded-2xl shadow-md border border-base-300 hover:shadow-lg transition-all duration-200"
        >
          {/* Avatar Profile Photo Wrapper */}
          <div className="avatar">
            <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img 
                src={photoUrl || "https://placeholder.co"} 
                alt={`${firstName}'s avatar`} 
              />
            </div>
          </div>

          {/* User Data Metadata Column */}
          <div className="flex-1 text-center sm:text-left">
            {/* Full Name */}
            <h2 className="text-xl font-bold text-base-content">
              {firstName} {lastName}
            </h2>

            {/* Badges for Age and Gender */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 my-1.5">
              {age && (
                <span className="badge badge-outline badge-sm font-semibold">
                  {age} Years Old
                </span>
              )}
              {gender && (
                <span className="badge badge-secondary badge-sm capitalize">
                  {gender}
                </span>
              )}
            </div>

            {/* About Blurb Section */}
            {about && (
              <p className="text-sm text-base-content/70 italic mt-1 max-w-md line-clamp-2">
                {about}
              </p>
            )}
          </div>
<button className="btn btn-success">Accept</button>
<button className="btn btn-error">Reject</button>
        </div>
      );
    })}
  </div>
</div>
    )
}

export default Requests;