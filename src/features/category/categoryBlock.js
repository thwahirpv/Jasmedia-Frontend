import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'

const categoryStatusToggle = createAsyncThunk(
    "category/block",
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.put('/blockCategory', data)
            return response.data
        } catch (error) {
            const message = error.response?.data?.error?.message || error.response?.data?.message || 'Something wrong!'
            return rejectWithValue(message)
        }
    }
)


const blockCategorySlice = createSlice({
    name: 'categoryBlock', 
    initialState: {
        isToggleLoading: false,
        categoryError: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(categoryStatusToggle.pending, (state, action) => {
            state.isToggleLoading = true
            state.categoryError = null
        })
        .addCase(categoryStatusToggle.fulfilled, (state, action) => {
            state.isToggleLoading = false
            state.categoryError = null
        })
        .addCase(categoryStatusToggle.rejected, (state, action) => {
            state.isToggleLoading = false
            state.categoryError = action.payload
        })
    }
})

export default blockCategorySlice.reducer
export { categoryStatusToggle }