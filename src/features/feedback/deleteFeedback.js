import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'

const deleteFeedbackThunk = createAsyncThunk(
    "feedback/delete",
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.delete('/deleteFeedback', {data: data})
            console.log(response, 'from slice')
            return 
        } catch (error) {
            console.log(error, 'from slice error')
            const message = error.response.data.error.message || error.message || error.response.data.message || error.response.message || 'Something wrong!'
            return rejectWithValue(message)
        }
    }
)


const deleteFeedbackSlice = createSlice({
    name: 'deleteFeedback',
    initialState: {
        isFBDeleteLoadnig: false,
        isFBDeleteError: null
    },
    reducers: {
        clearDeleteFbError: (state, action) => {
            state.isFBDeleteError = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(deleteFeedbackThunk.pending, (state, action) => {
            state.isFBDeleteLoadnig = true
            state.isFBDeleteError = null
        })
        .addCase(deleteFeedbackThunk.fulfilled, (state, action) => {
            state.isFBDeleteLoadnig = false
            state.isFBDeleteError = null
        })
        .addCase(deleteFeedbackThunk.rejected, (state, action) => {
            state.isFBDeleteLoadnig = false
            state.isFBDeleteError = action.payload || action.error.message || 'Something wrong!'
            console.log(state.isFBDeleteError, 'from reject')
        })
    }
})


export default deleteFeedbackSlice.reducer
export { deleteFeedbackThunk }
export const { clearDeleteFbError } = deleteFeedbackSlice.actions