import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const verifyEmailThunk = createAsyncThunk(
    "auth/verifyEmail", 
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.post('/forgotPassword', data)
            return response
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
        OtpEmail: null,
        isEmailVerifyLoading: false,
        errorEmailVerify: null
    },
    reducers:{
        clearEmailVerifyError: (state, action) => {
            state.errorEmailVerify = null
        }, 
        setOtpEmail: (state, actoin) => {
            state.OtpEmail = actoin.payload
        }
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
export const { clearEmailVerifyError, setOtpEmail } = verifyEmailSlice.actions
export { verifyEmailThunk } 