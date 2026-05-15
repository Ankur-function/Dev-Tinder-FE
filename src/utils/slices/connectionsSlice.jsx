import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name:'connection',
    initialState:null,
    reducers:{
        addConnection:(state,action)=>{     
            return action.payload;
        },
        removeConnection:()=>{
            return null
        }
    }
});

export const {addConnection,removeConnection} = connectionsSlice.actions;
export default connectionsSlice.reducer;