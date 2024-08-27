import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../store/UserSlice";

const store =  configureStore({
    reducer:{
        user:userSlice,
    },
});

export default store;