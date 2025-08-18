import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "@/utils/api";


const latestPortfolioThunk = createAsyncThunk(
    "portfolio/latestPortfolio", 
    async () => {
        try {
            const response = await userApi.get('/latest_portfolio')
            return response.data
        } catch (error) {
            throw new Error(error)
        }
    }
)


const latestPortfolioSlice = createSlice({
    name: 'latestPortfoio',
    initialState: {
        isLoading: false,
        errorLatestPortfolio: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(latestPortfolioThunk.pending, (state, action) => {
            state.isLoading = true
            state.errorLatestPortfolio = null
        })
        .addCase(latestPortfolioThunk.fulfilled, (state, actoin) => {
            state.isLoading = false
            state.errorLatestPortfolio = null
        })
        .addCase(latestPortfolioThunk.rejected, (state, actoin) => {
            state.isLoading = false
            state.errorLatestPortfolio = actoin.payload
        })
    }
})

export default latestPortfolioSlice.reducer
export { latestPortfolioThunk }