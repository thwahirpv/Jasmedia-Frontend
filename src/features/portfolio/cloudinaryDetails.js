import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'


const cloudinaryDetails = createAsyncThunk(
    "portfolio/coludinary_details",
    async () => {
        try {
            const response = await AdminApi.get('/signedUrl')
            return response.data.signedUrl
        } catch (error) {
            const message = error.message || "something wrong!"
            console.log(error, 'from slice')
            throw new Error(message) 
        }
    }
)

const cloudinaryDetailsSlice = createSlice({
    name: 'coludinary_details',
    initialState:{
        publicId: null,
        signature: null,
        signedUrl: null,
        apiKey: null,
        timestamp: null,
        CDetailError: null,
        CDetailISError: false
    },
    reducers: {
        setCDetailsIsError: (state, action) => {
            state.CDetailISError = false
            state.CDetailError = null
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(cloudinaryDetails.pending, (state, action) => {
            state.CDetailError = null
            state.CDetailISError = false
        })
        .addCase(cloudinaryDetails.fulfilled, (state, action) => {
            state.publicId = action.payload.publicId
            state.signature = action.payload.signature
            state.signedUrl = action.payload.signedUrl
            state.apiKey = action.payload.apiKey
            state.timestamp = action.payload.timestamp
            state.CDetailError = null
            state.CDetailISError = false
        })
        .addCase(cloudinaryDetails.rejected, (state, action) => {
            console.log(action, 'from rejected')
            state.CDetailError = action.error.message
            state.CDetailISError = true
        })
    }
})

export default cloudinaryDetailsSlice.reducer
export const { setCDetailsIsError } = cloudinaryDetailsSlice.actions
export { cloudinaryDetails }