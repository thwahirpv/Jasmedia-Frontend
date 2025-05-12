import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'

const portfolioListThunk = createAsyncThunk(
    "portfolio/list", 
    async () => {
        try{
            const response = await AdminApi.get('/getPortfolio')
            return response.data.data
        } catch(error) {
            console.log(error, 'from thunk error')
        }
    }
)

const portfolioListSlice = createSlice({
    name: 'porfolioList', 
    initialState: {
        isPortfolioLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(portfolioListThunk.pending, (state, action) => {
            state.isPortfolioLoading = true
            state.error = null
        })
        .addCase(portfolioListThunk.fulfilled, (state, action) => {
            state.isPortfolioLoading = false
            state.error = null
        })
        .addCase(portfolioListThunk.rejected, (state, action) => {
            state.isPortfolioLoading = true
            state.error = action.payload
        })
    }
})

export default portfolioListSlice.reducer
export { portfolioListThunk }