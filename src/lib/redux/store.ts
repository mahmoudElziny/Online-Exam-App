"use client";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export let ConfigStore = configureStore({
    reducer: {
        userSlice,
    },
})