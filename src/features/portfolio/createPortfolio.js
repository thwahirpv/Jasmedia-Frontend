import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminApi from '../../utils/api'



const createPortfolio = createAsyncThunk(
    "portfolio/create", 
    async (createData, {rejectWithValue}) => {
        try {
            console.log("I am reched create portfolio thunk")
            const response = await AdminApi.post('/portfolio', createData)
            console.log(response, 'from slice')
            return response.data
        } catch (error) {
            const message = error.response.data.message || error.response.message || 'Internet issue!'
            return rejectWithValue(message) 
        }
    }
)


const createPortFolioSlice = createSlice({
    name: 'create_portfolio', 
    initialState: {
        isCreateLoading: false,
        isCreateSuccess: false,
        createEror: null
    }, 
    reducers: {
        setIsCreateLoding: (state, action) => {
            state.isCreateLoading = false
        },
        setIsCreateSuccess: (state, action) => {
            state.isCreateSuccess = false
        },
        setCreateEror: (state, action) => {
            state.createEror = null
        }
    },
    extraReducers: (builder) => {
        builder 
        .addCase(createPortfolio.pending, (state, action) => { 
            state.isCreateLoading = true
            state.createEror = null
            state.isCreateSuccess = false
        })
        .addCase(createPortfolio.fulfilled, (state, action) => {
            state.isCreateLoading = false
            state.isCreateSuccess = true
            state.createEror = null
        })
        .addCase(createPortfolio.rejected, (state, action) => {
            state.isCreateLoading = false
            state.createEror = action.payload
            state.isCreateSuccess = false
            console.log(action, 'slice error action')
        })
    }
})

export default createPortFolioSlice.reducer
export {createPortfolio}
export const { setIsCreateLoding, setIsCreateSuccess, setCreateEror } = createPortFolioSlice.actions