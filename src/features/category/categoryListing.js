import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const listCategory = createAsyncThunk(
    "category/list",
    async () => {
        try {
            const response = await AdminApi.get('/getcategory')
            return response.data
        } catch (error) {
            const message = error.response?.data?.error?.message || "something wrong!"
            throw new Error(message) 
        }
    }
)

const listCategorySlice = createSlice({
    name: "categorylist",
    initialState: {
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(listCategory.pending, (state, action) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(listCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
        })
        .addCase(listCategory.rejected, (state, action) => {
            state.isLoading = false
            console.log(action, 'from reject')
            state.error = action?.error?.message
        })
    }
})

export default listCategorySlice.reducer
export { listCategory }