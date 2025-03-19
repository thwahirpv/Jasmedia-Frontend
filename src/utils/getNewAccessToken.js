import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/constants";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";

const getNewAccessToken = async () => {
    const dispatch = useDispatch()
    const refresh_token = localStorage.getItem(REFRESH_TOKEN)
    if (refresh_token){
        try {
            const response = await axios.get('api/refreshtoken', {refresh: refresh_token})
            localStorage.setItem(ACCESS_TOKEN, response.data?.access)
            return response?.data.access
        }catch (error) {
            dispatch(logOut())
            return null
        }
    }else{
        dispatch(logOut())
    }
}

export default getNewAccessToken