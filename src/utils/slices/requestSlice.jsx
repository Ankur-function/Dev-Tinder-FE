import { createSlice, current } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:'request',
    initialState:null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload
        },
        removeRequest:(state,action)=>{
            console.log('rm state-----',current(state));
            console.log('rm pay-----',action.payload);
            return state.filter((curr)=>{return curr._id != action.payload})
        }
    }
});

export const {addRequest,removeRequest} = requestSlice.actions;
export default requestSlice.reducer;