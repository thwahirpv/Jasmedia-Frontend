import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'

const totalCountThunk = createAsyncThunk(
    "dashboard/total",
    async () => {
        try {
            const response = await AdminApi.get('/admindashboard')  
            return response.data.data
        } catch (error) {
            const message = "something wrong!"
            throw new Error(message) 
        }
    }
)


const totalCountSlice = createSlice({
    name: 'totalCount', 
    initialState: {
        isTotalLoading: false, 
        totalError: false
    },
    extraReducers: (builder) => {
        builder 
        .addCase(totalCountThunk.pending, (state, actoin) => {
            state.isTotalLoading = true
            state.totalError = false
        })
        .addCase(totalCountThunk.fulfilled, (state, action) => {
            state.isTotalLoading = false
            state.totalError = false
        })
        .addCase(totalCountThunk.rejected, (state, action) => {
            state.isTotalLoading = false
            state.totalError = true
        })
    }
})


export default totalCountSlice.reducer
export { totalCountThunk }