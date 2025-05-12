import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const createCategory = createAsyncThunk(
    "category/create",
    async (data, {  }) => {
        try {
            const response = await AdminApi.post('/addCategory', data)
        } catch (error) {
            const message = error.response?.data?.error?.message || "Creating failed !"
            return rejectWithValue(message) 
        }
    }
)

const categorySlice = createSlice({
    name: "category",
    initialState: {
        isUpdateLoading: false,
        updateError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createCategory.pending, (state, actoin) => {
            state.isUpdateLoading = true
            state.updateError = null
        })
        .addCase(createCategory.fulfilled, (state, action) => {
            state.isUpdateLoading = false
            state.updateError = null
        })
        .addCase(createCategory.rejected, (state, action) => {
            state.isUpdateLoading = false
            state.updateError = action.payload
        })
    }
})

export default categorySlice.reducer
export { createCategory }