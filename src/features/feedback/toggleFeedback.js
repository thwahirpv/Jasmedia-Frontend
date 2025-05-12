import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'

const toggleFeedbackThunk = createAsyncThunk(
    "feedback/toggle",
    async (feedbackId, {rejectWithValue}) => {
        try {
            const reponse = await AdminApi.put('/togglefeedback', {'feedbackId': feedbackId})
        } catch (error) {
            console.log(error, 'from slice')
            const message = error.message || error.response.data.message || error.response.message || 'Something wrong!'
            return rejectWithValue(message)
        }
    }
)

const toggleFeedbackSlice = createSlice({
    name: 'toggleFeedback',
    initialState: {
        isFbToggleLoading: false,
        isFbError: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(toggleFeedbackThunk.pending, (state, action) => {
            state.isFbToggleLoading = true
            state.isFbError = null
        })
        .addCase(toggleFeedbackThunk.fulfilled, (state, action) => {
            state.isFbToggleLoading = false
            state.isFbError = null
        })
        .addCase(toggleFeedbackThunk.rejected, (state, action) => {
            state.isFbToggleLoading = false
            state.isFbError = action.payload || action.error.message || 'Something wrong!'
        })
    }
})


export default toggleFeedbackSlice.reducer
export { toggleFeedbackThunk }