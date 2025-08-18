import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'
import { EMAIL, PASSWORD, SOMETHING, UNREGISTERED } from "../../constants/constants";


const changePasswordThunk = createAsyncThunk(
    "auth/ChangePassword", 
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.put('/changePassword', data)
            console.log(response, 'res from slice')
            return response.data
        } catch (error) {
            const message = error?.response?.data?.email && { 'errorType':  EMAIL, 'message': error?.response?.data?.email }
            || error?.response?.data?.password && { 'errorType': PASSWORD, 'message': error?.response?.data?.password } 
            || error?.response?.data?.unregistered && { 'errorType': UNREGISTERED, 'message': error?.response?.data?.unregistered } 
            || { 'errorType': SOMETHING, 'message': "Something wrong! try once more"}
            return rejectWithValue(message)
        }
    }
)



const changePasswordSlice = createSlice({
    name: "changePassword", 
    initialState: {
        isChangePasswordLaoding: false, 
        changePasswordError: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(changePasswordThunk.pending, (state, actoin) => {
            state.isChangePasswordLaoding = true
            state.changePasswordError = null
        })
        .addCase(changePasswordThunk.fulfilled, (state, action) => {
            state.isChangePasswordLaoding = false
            state.changePasswordError = null
        })
        .addCase(changePasswordThunk.rejected, (state, action) => {
            state.isChangePasswordLaoding = false
            state.changePasswordError = action.payload
        })
    }
})


export default changePasswordSlice.reducer
export { changePasswordThunk }