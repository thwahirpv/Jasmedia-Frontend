import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import AuthReducer from '../features/auth/authSlice'
import categoryReducer from "../features/category/category"
import categoryLisingReducer from "../features/category/categoryListing"
import categoryUpdateReducer from "../features/category/categoryUpdate"
import cloudinaryDetailsReducer from "../features/portfolio/cloudinaryDetails"
import uploadToCloudinaryReducer from "../features/portfolio/UploadToCloudinary"
import createPortfolioReducer from "../features/portfolio/createPortfolio"
import categotyBlockUnblockReducer from '../features/category/categoryBlock'
import portfolioListReducer from '../features/portfolio/portfolioList'
import updatePortfolioReducer from '../features/portfolio/updatePortfolio'
import portfolioToggleReducer from '../features/portfolio/portfolioToggle'
import portfolioPreviewReducer from "../features/portfolio/portfolioPreview"
import portfolioDeleteReducers from '../features/portfolio/portfolioDelete'
import createFeedbackReducer from '../features/feedback/createFeedback'
import listFeedbackReducer from '../features/feedback/feedbackList'
import updateFeedbackReducer from '../features/feedback/updateFeedback'
import deleteFeedbackReducer from '../features/feedback/deleteFeedback'
import totalCountReducer from '../features/dashboard/totalCount'
import createAdminReducer from '../features/admin/createAdminSlice'
import listAdminReducer from '../features/admin/listAdminsSlice'


const rootReducer = combineReducers({
    auth: AuthReducer,
    category: categoryReducer,
    categoryList: categoryLisingReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryStatus: categotyBlockUnblockReducer,
    cloudinaryDetials: cloudinaryDetailsReducer,
    cloudinaryUpload: uploadToCloudinaryReducer,
    createPortfolio: createPortfolioReducer,
    portfolioList: portfolioListReducer,
    updatePortfolio: updatePortfolioReducer,
    togglePortfolio: portfolioToggleReducer,
    portfolioDelete: portfolioDeleteReducers,
    portfolioPreview: portfolioPreviewReducer,
    feedbackCreate: createFeedbackReducer,
    feedbackList: listFeedbackReducer,
    feedbackUpdate: updateFeedbackReducer,
    feedbackDelete: deleteFeedbackReducer,
    dashboardTotal: totalCountReducer,
    createAdmin: createAdminReducer,
    listAdmin: listAdminReducer,
})

const persistConfig = {
    key: "root", 
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store) 

export default store