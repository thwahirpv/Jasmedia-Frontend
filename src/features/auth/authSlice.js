import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const logIn = createAsyncThunk(
    "auth/login", 
    async (data, { rejectWithValue }) => {
        try{
            const response = await AdminApi.post('/login', data)
            return response.data
        }catch (error) {
            console.log(error, 'its from error part of slice')
            const message = error.response?.data?.error?.message || error.response?.data?.message || "Login failed !"
            return rejectWithValue(message)
        }
        
    }
)


const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        username: '', 
        email: '',
        isRootAdmin: false,
        isBlocked: false,
        isAuthenticated: false,
        isLoading: false, 
        error: null
    }, 
    reducers: {
        logOut: (state) => {
            state.isAuthenticated = false
            state.username = ''
            state.email = ''
            state.isRootAdmin = false
        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(logIn.pending, (state, action) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(logIn.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isLoading= false
            state.error = null
            state.isAuthenticated = true
            state.email = action.payload?.email
            state.username = action.payload?.name
            state.isRootAdmin = action.payload?.isRootAdmin
        })
        .addCase(logIn.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            console.log(action, 'is from reject')
        })
    }
})



export default authSlice.reducer
export const { logOut } = authSlice.actions
export { logIn }