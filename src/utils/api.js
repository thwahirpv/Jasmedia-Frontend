import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { ACCESS_TOKEN } from "../constants/constants";


const api = axios.create({
    baseURL: BASE_URL
})

api.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem(ACCESS_TOKEN)
        if(access_token){
            config.headers.Authorization = `Bearer ${access_token}`
        }
        return config
    }, 
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response.status == 401 && !originalRequest._retry){
            originalRequest._retry = true
            // const newAccessToken = await getNewAccessToken()
            // if (newAccessToken){
            //     api.defaults.headers.common['Authorization0'] = `Bearer ${newAccessToken}`
            //     return api(originalRequest)
            // }
        }
        return Promise.reject(error)
    }
)

export default api


