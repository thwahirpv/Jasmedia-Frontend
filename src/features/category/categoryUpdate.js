import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const updateCategoty = createAsyncThunk(
    "category/update", 
    async (data, {rejectWithValue}) => {
        try {
            const response = AdminApi.post('/updateCategory', data)
            return response.data
        } catch (error) {
            const message = error.response?.data?.error?.message || "Edit failed !"
            return rejectWithValue(message) 
        }
    }
)


const updateCategorySlice = createSlice({
    name: 'categoryUpdate',
    initialState: {
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateCategoty.pending, (state, action) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(updateCategoty.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
        })
        .addCase(updateCategoty.rejected, (state, action) => {
            state.isLoading = false
            state.error = action?.error?.message || "Edit failed !"
        })
    }
})

export default updateCategorySlice.reducer
export {updateCategoty}