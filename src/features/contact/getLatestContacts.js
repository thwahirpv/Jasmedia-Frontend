import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminApi } from "@/utils/api";

const getLatestContactsThunk = createAsyncThunk(
    "contact/getLatestContacts",
    async () => {
        try {
            const response = await AdminApi.get('/contacts')
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

const getLatestContactsSlice = createSlice({
    name: 'getLatestContacts',
    initialState: {
        isLoading: false,
        contacts: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(getLatestContactsThunk.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(getLatestContactsThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.contacts = action.payload.data
            state.error = null
        })
        .addCase(getLatestContactsThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }
})

export default getLatestContactsSlice.reducer
export { getLatestContactsThunk }
