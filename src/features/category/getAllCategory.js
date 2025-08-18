import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "@/utils/api";


const getAllCategoryThunk = createAsyncThunk(
    "category/getAllCategory",
    async () => {
        try {
            const response = await userApi.get('/category')
            return response.data
        } catch (error) {
            throw new Error(error)
        }
    }
)


const getAllCategorySlice = createSlice({
    name: 'getAllCategory', 
    initialState: {
        isLoading: false,
        errorGetAllCategory: null
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(getAllCategoryThunk.pending, (state, action) => {
            state.isLoading = false
            state.errorGetAllCategory = null
        })
        .addCase(getAllCategoryThunk.fulfilled, (state, action) => {
            state.isLoading= false
            state.errorGetAllCategory = null
        })
        .addCase(getAllCategoryThunk.rejected, (state, action) => {
            state.isLoading = false
            state.errorGetAllCategory = action.payload
        })
    }
})


export default getAllCategorySlice.reducer
export { getAllCategoryThunk }