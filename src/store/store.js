import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

// Auth
import AuthReducer from '../features/auth/authSlice'
import verifyEmailReducer from '../features/auth/verifyEmailSlice'
import verifyOtpReducer from '../features/auth/verifyOtpSlice'
import changePasswordReducer from '../features/auth/changePasswordSlice'
import contactFormReducer from '../features/auth/ContactFormSlice'
import getLatestContactsReducer from '../features/contact/getLatestContacts'

// Dashboard
import totalCountReducer from '../features/dashboard/totalCount'

// Category
    // Admin
import categoryReducer from "../features/category/category"
import categoryLisingReducer from "../features/category/categoryListing"
import categoryUpdateReducer from "../features/category/categoryUpdate"
import categotyBlockUnblockReducer from '../features/category/categoryBlock'
import categoryPortfolioPreviewReducer from '../features/category/categoryPreview'
    // User
import getAllCategoryReducer from '../features/category/getAllCategory'

// Portfolio
    // Admin
import cloudinaryDetailsReducer from "../features/portfolio/cloudinaryDetails"
import uploadToCloudinaryReducer from "../features/portfolio/UploadToCloudinary"
import createPortfolioReducer from "../features/portfolio/createPortfolio"
import portfolioListReducer from '../features/portfolio/portfolioList'
import updatePortfolioReducer from '../features/portfolio/updatePortfolio'
import portfolioToggleReducer from '../features/portfolio/portfolioToggle'
import portfolioPreviewReducer from "../features/portfolio/portfolioPreview"
import portfolioDeleteReducers from '../features/portfolio/portfolioDelete'
    // User
import latestPortfolioReducer from '../features/portfolio/latestPortfolio'
import getAllPortfolioReducer from '../features/portfolio/getFullPortfolio'



// Feedback
    // Admin
import createFeedbackReducer from '../features/feedback/createFeedback'
import listFeedbackReducer from '../features/feedback/feedbackList'
import updateFeedbackReducer from '../features/feedback/updateFeedback'
import deleteFeedbackReducer from '../features/feedback/deleteFeedback'
import toggleFeedbackReducer from '../features/feedback/toggleFeedback'
import feedbackPreviewReducer from '../features/feedback/feedbackPreview'
    // User
import getAllFeedbackReducer from '../features/feedback/getAllFeedback'



// Admin
import createAdminReducer from '../features/admin/createAdminSlice'
import listAdminReducer from '../features/admin/listAdminsSlice'
import deleteAdminReducer from '../features/admin/deleteAdminSlice'
import adminToggleReducer from '../features/admin/toggleAdminSliec'

// History
import listHistoryReducer from '../features/history/historySlice'









const rootReducer = combineReducers({
    // Auth
    auth: AuthReducer,
    verifyEmail: verifyEmailReducer,
    verifyOtp: verifyOtpReducer,
    changePassword: changePasswordReducer,
    contactForm: contactFormReducer,

    // Dashboard
    dashboardTotal: totalCountReducer,

    // Category
        // Admin
    category: categoryReducer,
    categoryList: categoryLisingReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryStatus: categotyBlockUnblockReducer,
    categoryPreview: categoryPortfolioPreviewReducer,
        // User
    getAllCategory: getAllCategoryReducer,
    

    // Portfolio
        // Admin
    cloudinaryDetials: cloudinaryDetailsReducer,
    cloudinaryUpload: uploadToCloudinaryReducer,
    createPortfolio: createPortfolioReducer,
    portfolioList: portfolioListReducer,
    updatePortfolio: updatePortfolioReducer,
    togglePortfolio: portfolioToggleReducer,
    portfolioPreview: portfolioPreviewReducer,
    portfolioDelete: portfolioDeleteReducers,
        // User
    latestPortfolio: latestPortfolioReducer,
    getAllPortfolio: getAllPortfolioReducer,

    // Feedback
        // Admin
    feedbackCreate: createFeedbackReducer,
    feedbackList: listFeedbackReducer,
    feedbackUpdate: updateFeedbackReducer,
    feedbackDelete: deleteFeedbackReducer,
    toggleFeedback: toggleFeedbackReducer,
    feedBackPreview: feedbackPreviewReducer,
        // User
    getAllFeedback: getAllFeedbackReducer,
    
    
    // Admin
    createAdmin: createAdminReducer,
    listAdmin: listAdminReducer,
    deleteAdmin: deleteAdminReducer,
    adminToggle: adminToggleReducer,

    
    // History
    listHistory: listHistoryReducer,

    // Contact
    latestContact: getLatestContactsReducer,
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