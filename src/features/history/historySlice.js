import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const historyThunk = createAsyncThunk(
    'history/list',
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.get('/gethistory', {
                params: data
            })
            console.log(response, 'from slice res')
            return response.data    
        } catch (error) {
            const message = error?.response?.data?.message || 'something wrong!'
            return rejectWithValue(message)
        }
    }
)


const historySlice = createSlice({
    name: 'historyList', 
    initialState: {
        isHistoryLoading: false,
        historyError: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(historyThunk.pending, (state, action) => {
            state.isHistoryLoading = true
            state.historyError = null
        })
        .addCase(historyThunk.fulfilled, (state, action) => {
            state.isHistoryLoading = false
            state.historyError = null
        })
        .addCase(historyThunk.rejected, (state, action) => {
            state.isHistoryLoading = false
            state.historyError = action.payload
            console.log(action)
        })
    }
})

export default historySlice.reducer
export { historyThunk }
