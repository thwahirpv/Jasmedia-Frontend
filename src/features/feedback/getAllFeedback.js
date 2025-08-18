import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "@/utils/api";
import { Satellite, StepBack } from "lucide-react";



const getAllFeedbackThunk = createAsyncThunk(
    "feedback/getAllFeedback", 
    async () => {
        try {
            const response = await userApi.get('/feedback')
            return response.data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
)



const getAllFeedbackSlice = createSlice({
    name: 'getAllFeedback',
    initialState: {
        isLoading: false,
        errorGetFeedback: null
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(getAllFeedbackThunk.pending, (state, action) => {
            state.isLoading = true
            state.errorGetFeedback = null
        })
        .addCase(getAllFeedbackThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.errorGetFeedback = null
        })
        .addCase(getAllFeedbackThunk.rejected, (state, action) => {
            state.isLoading = false
            state.errorGetFeedback = action.payload
        })
    }
})


export default getAllFeedbackSlice.reducer
export { getAllFeedbackThunk }