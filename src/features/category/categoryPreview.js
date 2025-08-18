import { createSlice } from "@reduxjs/toolkit";
import { format } from 'date-fns';


const initialState = {
    categoryId: '',
    name: '',
    status: true,
    totolPortfolio: null,
    createdAt: '',
    updatedAt: ''
}

const categoryPreviewSlice = createSlice({
    name: 'categoryPreview',
    initialState, 
    reducers: {
        setCategoryPreview: (state, action) => {
            state.categoryId = action.payload._id
            state.name = action.payload.name
            state.status = action.payload.status
            state.totolPortfolio = action.payload.totolPortfolio
            state.createdAt = format(new Date(action.payload.createdAt), 'dd MMMM yyyy, hh:mm a')
            state.updatedAt = format(new Date(action.payload.updatedAt), 'dd MMMM yyyy, hh:mm a')
        },
        clearCategoryPreview: () => initialState
    }
})

export default categoryPreviewSlice.reducer
export const { setCategoryPreview, clearCategoryPreview } = categoryPreviewSlice.actions