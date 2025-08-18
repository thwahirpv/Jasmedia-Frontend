import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from '../../utils/api'




const contactFormThunk = createAsyncThunk(
    "auth/contact", 
    async (data, {rejectWithValue}) => {
        try {
            const response = await userApi.post('/contact', data)
            return response
        } catch (error) {
            rejectWithValue(error)
        }
    }
)



const contactFormSlice = createSlice({
    name: 'contactForm', 
    initialState: {
        isFormLoading: false,
        formError: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(contactFormThunk.pending, (state, action) => {
            state.isFormLoading = true
            state.formError = null
        })
        .addCase(contactFormThunk.fulfilled, (state, action) => {
            state.isFormLoading = false
            state.formError = null
        })
        .addCase(contactFormThunk.rejected, (state, action) => {
            state.isFormLoading = false
            state.formError = action.payload
        })
    }
})



export default contactFormSlice.reducer
export { contactFormThunk }