import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { ACCESS_TOKEN } from "../constants/constants";


const AdminApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

AdminApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response){
            const status = error.response.status
            if(status == 403){
                window.location.href = '/admin/login'
            }
        }
        return Promise.reject(error)
    }
)

export default AdminApi


