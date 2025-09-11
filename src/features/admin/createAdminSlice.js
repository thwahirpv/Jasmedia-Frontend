import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'
import { EMAIL, NETWORK } from "../../constants/constants";


const createAdminThunk = createAsyncThunk(
    "admin/create", 
    async (data, {rejectWithValue}) => {
        try {
            const response = await AdminApi.post('/createRootadmin', data)
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
            const message = error?.response?.data?.error?.message ? {'errorType': EMAIL, 'message': error?.response?.data?.error?.message}
            : {'errorType': NETWORK, 'message': 'Check network and try!'}
            return rejectWithValue(message)
        }
    }
)



const createAdminSlice = createSlice({
    name: 'createAdmin', 
    initialState: {
        isAdminCreateLoading: false, 
        adminCreateError: null
    }, 
    extraReducers: (builder) => {
        builder 
        .addCase(createAdminThunk.pending, (state, action) => {
            state.isAdminCreateLoading = true
            state.adminCreateError = null
        })
        .addCase(createAdminThunk.fulfilled, (state, action) => {
            state.isAdminCreateLoading = false
            state.adminCreateError = null
        })
        .addCase(createAdminThunk.rejected, (state, action) => {
            state.isAdminCreateLoading = false
            state.adminCreateError = action.payload
        })
    }
})


export default createAdminSlice.reducer
export { createAdminThunk }