import axios from "axios";
import { BASE_URL, USER_URL } from "../constants/constants";
import { ACCESS_TOKEN } from "../constants/constants";
import storage from 'redux-persist/lib/storage'

const AdminApi = axios.create({
    baseURL: process.env.VITE_API_URL,
    withCredentials: true
})

export const userApi = axios.create({
    baseURL: USER_URL
})

AdminApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response){
            const status = error.response.status
            
            if(status == 403){
                storage.removeItem('persist:root')
                localStorage.removeItem('persist:root')
                localStorage.clear()
                window.location.href = '/admin/login'
            }
        }
        return Promise.reject(error)
    }
)

export default AdminApi



