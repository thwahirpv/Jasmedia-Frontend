import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const deleteAdminThunk = createAsyncThunk(
    "admin/delete", 
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.delete('/deleteAdmin', {data: data})
            return response
        } catch (error) {
            const message = error?.response?.data?.error?.message || error?.response?.data?.message || 'Something wrong!'
            return rejectWithValue(message)
        }
    }
)


const deleteAdminSlice = createSlice({
    name: 'deleteAdmin', 
    initialState: {
        isDeleteAdminLoading: false,
        deleteAdminError: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(deleteAdminThunk.pending, (state, action) => {
            state.isDeleteAdminLoading = true
            state.deleteAdminError = null
        })
        .addCase(deleteAdminThunk.fulfilled, (state, action) => {
            state.isDeleteAdminLoading = false
            state.deleteAdminError = null
        })
        .addCase(deleteAdminThunk.rejected, (state, action) => {
            state.isDeleteAdminLoading = false 
            state.deleteAdminError = action.payload
        })
    }
})


export default deleteAdminSlice.reducer
export { deleteAdminThunk }