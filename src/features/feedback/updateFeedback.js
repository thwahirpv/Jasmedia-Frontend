import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'

const updateFeedbackThunk = createAsyncThunk(
    "feedback/update",
    async (data, {rejectWithValue}) => {
        try {
            console.log('ready to update')
            const response = await AdminApi.put('/editFeedback', data)
            return response.data
        } catch (error) {
            const message = error.message || error.response.data.message || error.response.message || 'Something wrong!'
            return rejectWithValue(message) 
        }
    }
)



const updateFeedbackSlice = createSlice({
    name: 'updateFeedback',
    initialState: {
        isUpdateFeedbackLoading: false,
        isUpdateFeedbackError: null,
        isUpdateFeedbackSuccess: false
    },
    reducers: {
        setupdateFbSuccess: (state, action) => {
            state.isUpdateFeedbackSuccess = false
        },
        setUpdateFbError: (state, action) => {
            state.isUpdateFeedbackError = null
        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(updateFeedbackThunk.pending, (state, action) => {
            state.isUpdateFeedbackLoading = true
            state.isUpdateFeedbackError = null
            state.isUpdateFeedbackSuccess = false
        })
        .addCase(updateFeedbackThunk.fulfilled, (state, action) => {
            state.isUpdateFeedbackLoading = false
            state.isUpdateFeedbackSuccess = true
            state.isUpdateFeedbackError = null
        })
        .addCase(updateFeedbackThunk.rejected, (state, action) => {
            state.isUpdateFeedbackLoading = false
            state.isUpdateFeedbackError = action.payload
            console.log(action)
            state.isUpdateFeedbackSuccess = false
        })
    }
})

export default updateFeedbackSlice.reducer
export { updateFeedbackThunk }
export const { setupdateFbSuccess, setUpdateFbError } = updateFeedbackSlice.actions