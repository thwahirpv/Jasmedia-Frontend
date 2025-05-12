import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'

const categoryStatusToggle = createAsyncThunk(
    "category/block",
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.put('/blockCategory', data)
            console.log(response, 'from slice sucess')
            return response.data
        } catch (error) {
            console.log(error, 'from slice catch')
        }
    }
)


const blockCategorySlice = createSlice({
    name: 'categoryBlock', 
    initialState: {
        isToggleLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(categoryStatusToggle.pending, (state, action) => {
            state.isToggleLoading = true
            state.error = null
        })
        .addCase(categoryStatusToggle.fulfilled, (state, action) => {
            state.isToggleLoading = true
            state.error = null
        })
        .addCase(categoryStatusToggle.rejected, (state, action) => {
            state.isToggleLoading = false
            state.error = action.payload
        })
    }
})

export default blockCategorySlice.reducer
export { categoryStatusToggle }