import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addUserInFeed:(state,action)=>{
            return action.payload
        },
        removeUserFromFeed:(state,action)=>{
            return state.filter((curr)=>{return curr._id != action.payload})
        }
    }
});

export const {addUserInFeed,removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;