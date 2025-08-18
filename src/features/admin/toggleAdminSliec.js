import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const toggleAdminThunk = createAsyncThunk(
    "admin/toggle",
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.put('/toggleAdmin', data)
            console.log('response from admin toggle:', response)
            return response.data
        } catch (error) {
            console.log(error, 'from slice in the toggle')
            const message = error?.response?.data?.error?.message || error?.response?.data?.message || 'Something wrong!'
            return rejectWithValue(message)
        }
    }
)


const toggleAdminSlice = createSlice({
    name: 'adminToggle',
    initialState: {
        isAdminToggleLoading: false,
        adminToggleError: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(toggleAdminThunk.pending, (state, action) => {
            state.isAdminToggleLoading = true
            state.adminToggleError = null
        })
        .addCase(toggleAdminThunk.fulfilled, (state, action) => {
            state.isAdminToggleLoading = false
            state.adminToggleError = null
        })
        .addCase(toggleAdminThunk.rejected, (state, action) => {
            state.isAdminToggleLoading = false
            state.adminToggleError = action.payload
        })
    }
})


export default toggleAdminSlice.reducer
export { toggleAdminThunk }