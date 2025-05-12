import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const portfolioDeleteThunk = createAsyncThunk(
    "portfolio/delete", 
    async (data, {rejectWithValue}) => {
        try{
            const response = await AdminApi.delete('/deletePortfolio', {data: data})
            console.log(response, 'from thunk')
            return response.data
        } catch (error) {
            console.log(error)
            console.log(error, 'from thunk')
            const message = error.response.data.error || error.response.message || 'Internet issue!'
            return rejectWithValue(message) 
        }
    }
)

const portfolioDeleteSlice = createSlice({
    name: 'portfolioDelete', 
    initialState: {
        isPortfolioDeleteLoading: false,
        portfolioDeleteError: null
    }, 
    reducers: {
        setPortfolioError: (state, action) => {
            state.portfolioDeleteError = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(portfolioDeleteThunk.pending, (state, action) => {
            state.isPortfolioDeleteLoading = true
            state.portfolioDeleteError = null
        })
        .addCase(portfolioDeleteThunk.fulfilled, (state, action) => {
            state.isPortfolioDeleteLoading = false
            state.portfolioDeleteError = null
        })
        .addCase(portfolioDeleteThunk.rejected, (state, action) => {
            state.isPortfolioDeleteLoading = false
            state.portfolioDeleteError = action.payload.message
        })
    }
})

export default portfolioDeleteSlice.reducer
export { portfolioDeleteThunk }
export const {setPortfolioError} = portfolioDeleteSlice.actions