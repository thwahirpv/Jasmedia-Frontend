import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AdminApi from "../../utils/api";


const uplaodToCloudinary = createAsyncThunk(
    "portfilio/upload_to_cloudinary",
    async (data, {dispatch, rejectWithValue, signal}) => {
        console.log(data)
        try {
            const response = await axios.post(data.signedUrl, data.formData,
                {
                    signal,
                    onUploadProgress: (e) => {
                        dispatch(setProgress(Math.round((100 * e.loaded) / e.total)))
                    },
                    headers: {
                        "Content-Type": "multipart/form-data", 
                    }
                }
            )
            return response.data
        } catch (error) {
            console.log(error)
            if(axios.isCancel(error)){
                console.log('uploaded cancelled from slice if')
                dispatch(onIsUploadCancel())
                return rejectWithValue('Upload Cancelled!')
            }
            const message = error.message || "Uploading failed"
            return rejectWithValue(message) 
        }
    }
)

const initialState = {
    isUploading: false,
    uploadingError: null,
    uploadingProgress: 0,
    isUploadCancel: false
}


const uplaodToCloudinarySlice = createSlice({
    name: "uplaod_to_cloudinary",
    initialState,
    reducers: {
        setProgress: (state, action) => {
            state.uploadingProgress = action.payload
        },
        onIsUploadCancel: (state, action) => {
            state.isUploadCancel = true
        },
        offIsUploadCancel: (state, action) => {
            state.isUploadCancel = false
        },
        clearAllUploadData: (state, action) => {
            state.isUploading = false
            state.uploadingError = null
            state.uploadingProgress = 0
            state.isUploadCancel = false
        } 
    },
    extraReducers: (builder) => {
        builder
        .addCase(uplaodToCloudinary.pending, (state, action) => {
            state.isUploading = true
            state.uploadingError = null
            state.uploadingProgress = 0,
            state.isUploadCancel = false
        })
        .addCase(uplaodToCloudinary.fulfilled, (state, action) => {
            state.isUploading = false
            state.uploadingError = null
            state.uploadingProgress = 100
            state.isUploadCancel = false
        })
        .addCase(uplaodToCloudinary.rejected, (state, action) => {
            state.isUploading = false
            state.uploadingError = action.payload
            state.uploadingProgress = 0
            state.isUploadCancel = false
        })
    }
})


export default uplaodToCloudinarySlice.reducer
export const { setProgress, onIsUploadCancel, offIsUploadCancel, clearAllUploadData } = uplaodToCloudinarySlice.actions
export { uplaodToCloudinary }