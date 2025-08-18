import { bindActionCreators, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'
import { constructNow } from "date-fns";


const verifyOtpThunk = createAsyncThunk(
    "auth/verifyOtp",
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.post('/verifyOtp', data)
            console.log(response)
            return response.data
        } catch (error) {
            const message = error?.response?.data?.error?.message || error?.response?.data?.message
            console.log(message, 'from slice')
            console.log(error)
            return rejectWithValue(message)
        }
    }
)


const verifyOtpSlice = createSlice({
    name: 'verifyOtp',
    initialState: {
        isOtpVerifyLoading: false,
        errorOtpVerify: null
    },
    reducers: {
        clearOtpError: (state, actoin) => {
            state.errorOtpVerify = null
        }
    },
    extraReducers: (builder) => {
        builder 
        .addCase(verifyOtpThunk.pending, (state, action) => {
            state.isOtpVerifyLoading = true
            state.errorOtpVerify = null
        })
        .addCase(verifyOtpThunk.fulfilled, (state, action) => {
            state.isOtpVerifyLoading = false
            state.errorOtpVerify = null
        })
        .addCase(verifyOtpThunk.rejected, (state, action) => {
            state.isOtpVerifyLoading = false
            state.errorOtpVerify = action.payload
        })
    }
})


export default verifyOtpSlice.reducer
export const { clearOtpError } = verifyOtpSlice.actions
export { verifyOtpThunk }