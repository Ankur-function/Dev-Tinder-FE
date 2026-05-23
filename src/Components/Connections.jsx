import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../utils/slices/connectionsSlice"
import { Link } from "react-router-dom"

const Connections = () =>{
    const dispatch = useDispatch();
    const connections = useSelector((store)=>{return store.connection});

    const fetchConnections = async() =>{
        const resp = await axios.get(`${BASE_URL}/user/requests/connected`,{withCredentials:true})
        dispatch(addConnection(resp.data.data));
    }

    useEffect(()=>{
        fetchConnections()
    },[])

    if (!connections) return
    if (connections && connections.length === 0) return <h1>No Connection Available</h1>
    
    return(

        <div className="flex flex-col items-center justify-center p-4 my-10 max-w-2xl mx-auto">
  {/* Header Section */}
  <div className="text-center mb-8">
    <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
      Connections
    </h1>
    <p className="text-sm text-base-content/60 mt-1">
      You have {connections.length} active connections
    </p>
  </div>

  {/* Connections Container */}
  <div className="w-full flex flex-col gap-4">
    {connections.map((connect) => {
      return (
        <div 
          key={connect._id} 
          className="flex flex-col sm:flex-row items-center gap-4 bg-base-100 p-5 rounded-2xl shadow-md border border-base-300 hover:shadow-lg transition-all duration-200"
        >
          {/* Avatar Profile Photo Wrapper */}
          <div className="avatar">
            <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img 
                src={connect.photoUrl || "https://placeholder.co"} 
                alt={`${connect.firstName}'s avatar`} 
              />
            </div>
          </div>

          {/* User Data Metadata Column */}
          <div className="flex-1 text-center sm:text-left">
            {/* Full Name */}
            <h2 className="text-xl font-bold text-base-content">
              {connect.firstName} {connect.lastName}
            </h2>

            {/* Badges for Age and Gender */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 my-1.5">
              {connect.age && (
                <span className="badge badge-outline badge-sm font-semibold">
                  {connect.age} Years Old
                </span>
              )}
              {connect.gender && (
                <span className="badge badge-secondary badge-sm capitalize">
                  {connect.gender}
                </span>
              )}
            </div>

            {/* About Blurb Section */}
            {connect.about && (
              <p className="text-sm text-base-content/70 italic mt-1 max-w-md line-clamp-2">
                {connect.about}
              </p>
            )}
          </div>

          {/* Action Buttons Option */}
          <div className="flex gap-2 sm:self-center">
            <Link to={`/chat/${connect._id}`}><button className="btn btn-primary btn-sm rounded-xl">Chat</button></Link>
          </div>
        </div>
      );
    })}
  </div>
</div>

    )
}
export default Connections