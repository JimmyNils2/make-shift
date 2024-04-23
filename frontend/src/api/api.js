import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';
import { getEnvVariables } from '../helpers';

// const apiUrl = "https://b21e2f91-4330-4f59-be11-0c6d8ec6c1f2-dev.e1-us-cdp-2.choreoapis.dev/djangoreact/backend/rest-api-be2/v1.0"

const {VITE_API_URL} = getEnvVariables()

const api = axios.create({
    baseURL: VITE_API_URL /*? import.meta.env.VITE_API_URL : apiUrl*/
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