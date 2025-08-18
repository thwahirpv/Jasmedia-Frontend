import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "@/utils/api";



const getAllPortfolioThunk = createAsyncThunk(
    "portfolio/getAllPortfolio",
    async () => {
        try {
            const response = await userApi.get('/portfolio')
            return response.data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
)


const getAllPortfolioSlice = createSlice({
    name: 'getFullPortfolio', 
    initialState: {
        isLoading: false,
        errorGetFullPortfolio: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllPortfolioThunk.pending, (state, action) => {
            state.isLoading = true
            state.errorGetFullPortfolio = null
        })
        .addCase(getAllPortfolioThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.errorGetFullPortfolio = null
        })
        .addCase(getAllPortfolioThunk.rejected, (state, action) => {
            state.isLoading = false
            state.errorGetFullPortfolio = action.payload
        })
    }
})


export default getAllPortfolioSlice.reducer
export { getAllPortfolioThunk }