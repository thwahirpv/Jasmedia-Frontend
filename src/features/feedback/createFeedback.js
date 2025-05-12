import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const createFeedbackThunk = createAsyncThunk(
    "feedback/create", 
    async (data, {rejectWithValue}) => {
        try{
            const response = await AdminApi.post('/addFeedback', data)
            console.log(response)
            return response.data
        } catch (error) {
            const message = error.message || error.response.data.message || error.response.message || 'Something wrong!'
            return rejectWithValue(message) 
        }
    }
)

const createFeedbackSlice = createSlice({
    name: 'createPortfolio',
    initialState: {
        isCreatePortfolioLoaing: false,
        isCreatePortfolioError: null,
        isCreatePortfolioSuccess: false
    },
    reducers: {
        setFeedbackSuccess: (state, action) => {
            state.isCreatePortfolioSuccess = false
        },
        clearFeedbackError: (state, action) => {
            state.isCreatePortfolioError = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createFeedbackThunk.pending, (state, action) => {
            state.isCreatePortfolioLoaing = true
            state.isCreatePortfolioError = null
        })
        .addCase(createFeedbackThunk.fulfilled, (state, action) => {
            state.isCreatePortfolioLoaing = false
            state.isCreatePortfolioError = null
            state.isCreatePortfolioSuccess = true
        })
        .addCase(createFeedbackThunk.rejected, (state, action) => {
            state.isCreatePortfolioLoaing = false
            state.isCreatePortfolioError = action.payload || action.error.message || 'Something wrong!'
            state.isCreatePortfolioSuccess = false
        })
    }
})


export default createFeedbackSlice.reducer
export { createFeedbackThunk }
export const {setFeedbackSuccess, clearFeedbackError} = createFeedbackSlice.actions