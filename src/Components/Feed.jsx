import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slices/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feedsData = useSelector((store)=>{return store.feed});

    const getFeeds = async() =>{
        const feeds = await axios.get(`${BASE_URL}/user/feed`,{withCredentials:true});
        dispatch(addFeed(feeds?.data?.data))
    }

    useEffect(()=>{
        if (!feedsData) {
        getFeeds();
        }
    })
    return feedsData && (
        <div className="flex justify-center my-10">
       <UserCard user={feedsData[0]}/>
        </div>
    )
}

export default Feed;