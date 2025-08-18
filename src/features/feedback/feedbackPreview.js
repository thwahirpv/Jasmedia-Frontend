import { createSlice } from "@reduxjs/toolkit";
import { format } from 'date-fns';


const initialState = {
    feedbackId: '',
    name: '',
    feedback: '',
    role: '',
    status: true,
    createdAt: '',
    updatedAt: ''
}


const feedbackPreviewSlice = createSlice({
    name: 'feedbackPreview',
    initialState, 
    reducers: {
        setFeedbackPreview: (state, action) => {
            state.feedbackId = action.payload._id
            state.name = action.payload.name
            state.feedback = action.payload.feedback
            state.role = action.payload.role
            state.status = action.payload.status
            state.createdAt = format(new Date(action.payload.createdAt), 'dd MMMM yyyy, hh:mm a')
            state.updatedAt = format(new Date(action.payload.updatedAt), 'dd MMMM yyyy, hh:mm a')
        },
        clearFeedbackPreview: () => initialState
    }
})

export default feedbackPreviewSlice.reducer
export const { setFeedbackPreview, clearFeedbackPreview } = feedbackPreviewSlice.actions