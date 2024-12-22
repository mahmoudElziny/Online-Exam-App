"use client";
import { createSlice } from "@reduxjs/toolkit";


let userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        token: null,
    },
    reducers: {
        changeToken: (state, action) => {
            state.token = action.payload;
        },
        changeUserData: (state, action) => {
            state.userData = action.payload;
        },
        
    },
});

export const { changeToken, changeUserData } = userSlice.actions;



export default userSlice.reducer;    


