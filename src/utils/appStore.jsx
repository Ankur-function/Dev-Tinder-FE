import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./slices/userSlice";
import feedReducer from "./slices/feedSlice"
import connectionReducer from "./slices/connectionsSlice";

const appStore = configureStore({

    reducer:{
        user : useReducer,
        feed: feedReducer,
        connection: connectionReducer
    }
})

export default appStore