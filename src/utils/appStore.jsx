import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./slices/userSlice";

const appStore = configureStore({

    reducer:{
        user : useReducer
    }
})

export default appStore