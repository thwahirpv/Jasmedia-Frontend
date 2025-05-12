import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const listFeedbackThunk = createAsyncThunk(
    "feedback/list",
    async () => {
        try {
            const response = await AdminApi.get('/feedback')
            return response.data.data
        } catch (error) {
            const message = error.message || "something wrong!"
            console.log(error, 'from slice error')
            throw new Error(message)
        }
    }
)


const listFeedbackSlice = createSlice({
    name: 'feedbackList',
    initialState: {
        isListLoading: false,
        isListError: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(listFeedbackThunk.pending, (state, action) => {
            state.isListLoading = true
            state.isListError = null
        })
        .addCase(listFeedbackThunk.fulfilled, (state, actoin) => {
            state.isListLoading = false
            state.isListError = null
        })
        .addCase(listFeedbackThunk.rejected, (state, action) => {
            state.isListLoading = false
            state.isListError = action.payload || action.error.message || 'Something wrong!'
        })
    }
})

export default listFeedbackSlice.reducer
export { listFeedbackThunk }