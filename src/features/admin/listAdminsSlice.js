import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AdminApi from '../../utils/api'


const listAdminThunk = createAsyncThunk(
    "admin/create", 
    async () => {
        try {
            const response = await AdminApi.get('/getAdmins')
            console.log('Admins:', response.data.admins)
            return response.data.admins
        } catch (error) {
            console.log(error)
            const message = error.response?.data?.error?.message || "Something wrong!"
            throw new Error(message) 
        }
    }
)



const listAdminSlice = createSlice({
    name: 'listAdmins', 
    initialState: {
        isListAdminLoading: false, 
        listAdminError: null
    }, 
    extraReducers: (builder) => {
        builder 
        .addCase(listAdminThunk.pending, (state, action) => {
            state.isListAdminLoading = true
            state.listAdminError = null
        })
        .addCase(listAdminThunk.fulfilled, (state, action) => {
            state.isListAdminLoading = false
            state.listAdminError = null
        })
        .addCase(listAdminThunk.rejected, (state, action) => {
            state.isListAdminLoading = false
            state.listAdminError = action.payload
        })
    }
})


export default listAdminSlice.reducer
export { listAdminThunk }