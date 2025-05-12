import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const logIn = createAsyncThunk(
    "auth/login", 
    async (data, { rejectWithValue }) => {
        try{
            const response = await AdminApi.post('/login', data)
            console.log(response, 'from slice')
            return response.data
        }catch (error) {
            console.log(error, 'its from error part of slice')
            const message = error.response?.data?.error?.message || "Login failed !"
            return rejectWithValue(message)
        }
        
    }
)


const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        username: '', 
        email: '',
        isAuthenticated: false,
        isLoading: false, 
        error: null
    }, 
    reducers: {
        logOut: (state) => {
            state.isAuthenticated = false
            state.username = ''
            state.email = ''
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
            state.username = 'Admin'
            state.email = action.payload.adminDetails.emailAddress
            state.isAuthenticated = true
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