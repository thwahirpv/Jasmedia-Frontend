import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const createCategory = createAsyncThunk(
    "category/create",
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.post('/addCategory', data)
            console.log(response, 'from slice')
            return response.data
        } catch (error) {
            const message = error.response?.data?.error?.message || "Creating failed !"
            return rejectWithValue(message) 
        }
    }
)

const categorySlice = createSlice({
    name: "category",
    initialState: {
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createCategory.pending, (state, actoin) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(createCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
        })
        .addCase(createCategory.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export default categorySlice.reducer
export { createCategory }