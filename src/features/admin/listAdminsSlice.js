import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'
import { EMAIL, NETWORK } from "../../constants/constants";


const listAdminThunk = createAsyncThunk(
    "admin/create", 
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.post('/createRootadmin')
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            const message = error?.response?.data?.error?.message ? {'errorType': EMAIL, 'message': error?.response?.data?.error?.message}
            : {'errorType': NETWORK, 'message': 'Check network and try!'}
            return rejectWithValue(message)
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