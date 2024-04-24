import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';
import { getEnvVariables } from '../helpers';

const apiUrl = "/choreo-apis/make-shift/backend/rest-api-be2/v1.0"

// const {VITE_API_URL} = getEnvVariables()

const api = axios.create({
<<<<<<< HEAD
    baseURL: apiUrl
    // baseURL: VITE_API_URL ? VITE_API_URL : apiUrl
=======
    baseURL: VITE_API_URL ? VITE_API_URL : apiUrl
>>>>>>> cf8c2a0c68fed30f8ce540fd566298e01590b351
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (e) => {
        console.log(e.message);
        return Promise.reject(e);
    }
)

export default api;