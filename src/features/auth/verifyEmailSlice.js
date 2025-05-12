import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const verifyEmailThunk = createAsyncThunk(
    "auth/verifyEmail", 
    async (data, {rejectWithValue}) => {
        try {
            const response = AdminApi.post('something', data)
            return response.data
        } catch (error) {
            console.log(error, 'its from error part of slice')
            const message = error.response?.data?.error?.message || "Login failed !"
            return rejectWithValue(message)
        }
    }
)


const verifyEmailSlice = createSlice({
    name: 'verifyEmail', 
    initialState: {
        isEmailVerifyLoading: false,
        errorEmailVerify: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(verifyEmailThunk.pending, (state, action) => {
            state.isEmailVerifyLoading = true
            state.errorEmailVerify = false
        })
        .addCase(verifyEmailThunk.fulfilled, (state, action) => {
            state.isEmailVerifyLoading = false
            state.errorEmailVerify = null
        })
        .addCase(verifyEmailThunk.rejected, (state, action) => {
            state.isEmailVerifyLoading = false 
            state.errorEmailVerify = action.payload
        })
    }

})

export default verifyEmailSlice.reducer
export { verifyEmailThunk } 