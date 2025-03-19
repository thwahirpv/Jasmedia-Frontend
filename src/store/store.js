import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../features/auth/authSlice'


const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
})

export default store