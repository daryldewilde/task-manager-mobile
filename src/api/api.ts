import axios from "axios";
import { API_BASE_URL } from "@env";
import { loginCreds, singnUpCreds } from "../types/types";
import { getData, removeData } from "../utils/utils";

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor to handle 401 errors globally
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.log("401 Unauthorized - Clearing token");
            await removeData('token');
            // Token removal will trigger MainStack to re-render and show auth screen
        }
        return Promise.reject(error);
    }
);

const signUpUser = async (data:singnUpCreds) => {
    try {
        const response = await apiClient.post('/auth/signup', data);
        return response.data;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
}

const loginUser = async (data:loginCreds) => {
    try {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    } catch (error) {   
        console.error("Error logging in:", error);
        // Also log the response data if available for more insights
        if (axios.isAxiosError(error) && error.response) {
            console.error("Response data:", error.response.data);
        }
        throw error;
    }
}

const fetchAllTasks = async () => {
    try {
        const token = await getData('token');
        console.log("Token retrieved for fetching tasks:", token);
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await apiClient.get('/tasks/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log("Tasks fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        if (axios.isAxiosError(error) && error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
            console.error("Response headers:", error.response.headers);
        }
        throw error;
    }
}

export { signUpUser, loginUser, fetchAllTasks };