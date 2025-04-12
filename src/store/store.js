import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import AuthReducer from '../features/auth/authSlice'
import categoryReducer from "../features/category/category"
import categoryLisingReducer from "../features/category/categoryListing"
import categoryUpdateReducer from "../features/category/categoryUpdate"


const rootReducer = combineReducers({
    auth: AuthReducer,
    category: categoryReducer,
    categoryList: categoryLisingReducer,
    categoryUpdate: categoryUpdateReducer
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