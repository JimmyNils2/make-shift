import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';
import { getEnvVariables } from '../helpers';

// The production URL
const apiUrl = "/choreo-apis/make-shift/backend/rest-api-be2/v1.0"

const {VITE_API_URL} = getEnvVariables()

// Create an Axios instance to handle the request and set the token and the dynamic url
const api = axios.create({
    // baseURL: apiUrl
    baseURL: VITE_API_URL ? VITE_API_URL : apiUrl
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