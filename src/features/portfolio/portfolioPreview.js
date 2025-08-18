import { createSlice } from "@reduxjs/toolkit";
import { format } from 'date-fns';


const initialState = {
    portfolioId: '',
    title: '',
    description: '',
    type: '',
    category: '',
    status: true,
    contentLink: null,
    createdAt: '',
    updatedAt: ''
  };

const portfolioPreviewSlice = createSlice({
    name: 'portfolioPreview', 
    initialState,
    reducers: {
        setportfolioPreview: (state, action) => {
            state.portfolioId = action.payload._id
            state.title = action.payload.title
            state.description = action.payload.description
            state.type = action.payload.type
            state.category = action.payload.category.name
            state.contentLink = action.payload.secureUrl
            state.status = action.payload.status
            state.createdAt = format(new Date(action.payload.createdAt), 'dd MMMM yyyy, hh:mm a')
            state.updatedAt = format(new Date(action.payload.updatedAt), 'dd MMMM yyyy, hh:mm a')
        },
        clearPortfolioPreview: () => initialState
    }
})


export default portfolioPreviewSlice.reducer
export const {setportfolioPreview, clearPortfolioPreview} = portfolioPreviewSlice.actions