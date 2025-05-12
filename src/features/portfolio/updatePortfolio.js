import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'

const updatePortfolio = createAsyncThunk(
    "portfolio/update", 
    async (updateData, {rejectWithValue}) => {
        try{
            const response = await AdminApi.post('/updatePortfolio', updateData)
            return response.data
        } catch (error) {
            const message = error.response.data.message || error.response.message || 'Internet issue!'
            return rejectWithValue(message) 
        }
    }
)


const updatePortfolioSlice = createSlice({
    name: 'update_portfolio',
    initialState: {
        isUpdatingLoading: false,
        isUpdatingSuccess: false,
        updateError: null
    },
    reducers: {
        setIsUpdateSuccess: (state, action) => {
            state.isUpdatingSuccess = false
        }, 
        setUpdateError: (state, actoin) => {
            state.updateError = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(updatePortfolio.pending, (state, action) => {
            state.isUpdatingLoading = true
            state.isUpdatingSuccess = false
            state.updateError = null
        })
        .addCase(updatePortfolio.fulfilled, (state, action) => {
            state.isUpdatingLoading = false
            state.isUpdatingSuccess = true
            state.updateError = null
        })
        .addCase(updatePortfolio.rejected, (state, action) => {
            state.isUpdatingLoading = false
            state.isUpdatingSuccess = false
            state.updateError = action.payload
        })
    }
})


export default updatePortfolioSlice.reducer
export const {setIsUpdateSuccess, setUpdateError} = updatePortfolioSlice.actions
export { updatePortfolio }