import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserInFeed} from "../utils/slices/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feedsData = useSelector((store)=>{return store.feed});
console.log('feedsData=============',feedsData);

    const getFeeds = async() =>{
        const feeds = await axios.get(`${BASE_URL}/user/feed`,{withCredentials:true});
        dispatch(addUserInFeed(feeds?.data?.data))
    }

    useEffect(()=>{
        if (!feedsData) {
        getFeeds();
        }
    },[])

    if(!feedsData) return
    if (feedsData.length <=0) return <h1 className="flex justify-center">No Feeds Available </h1> 
    return feedsData && (
        <div className="flex justify-center my-10">
       <UserCard user={feedsData[0]}/>
        </div>
    )
}

export default Feed;