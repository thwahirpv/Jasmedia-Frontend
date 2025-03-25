import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import Login from "../../pages/admin/Login";


const logIn = createAsyncThunk(
    "auth/login", 
    async (data, { rejectWithValue }) => {
        try{
            console.log(data)
            const response = await api.post('/login', data)
            console.log(response)
            return response.data
        }catch (error) {
            const message = error.response?.data?.detail || "Login failed !"
            rejectWithValue(message)
        }
        
    }
)


const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        user: null, 
        isLoading: false, 
        error: null
    }, 
    reducers: {
        logOut: (state) => {

        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(logIn.pending, (state, action) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(logIn.fulfilled, (state, action) => {
            state.isLoading= false
            state.error = null
            console.log(action.payload)
            state.user = action.payload
        })
        .addCase(logIn.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})



export default authSlice.reducer
export const { logOut } = authSlice.actions
export { logIn }