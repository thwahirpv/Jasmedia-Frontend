import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'

const portfolioToggleThunk = createAsyncThunk(
    "portfolio/toggle",
    async (data, {rejectWithValue}) => {
        try{
            const response = await AdminApi.put('/togglePortfolio', data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)


const portfolioToggleSlice = createSlice({
    name: 'portfolioToggle', 
    initialState: {
        isportfolioToogleLoading: false,
        portfolioToggleError: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(portfolioToggleThunk.pending, (state, action) => {
            state.isportfolioToogleLoading = true
            state.portfolioToggleError = null
        })
        .addCase(portfolioToggleThunk.fulfilled, (state, action) => {
            state.isportfolioToogleLoading = false
            state.portfolioToggleError= null
        })
        .addCase(portfolioToggleThunk.rejected, (state, action) => {
            state.isportfolioToogleLoading = false
            state.portfolioToggleError= action.payload
        })
    }
})

export default portfolioToggleSlice.reducer
export { portfolioToggleThunk }