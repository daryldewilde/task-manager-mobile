import axios from "axios";
import { API_BASE_URL } from "@env";
import { loginCreds, singnUpCreds, task } from "../types/types";
import { getData } from "../utils/utils";

// This will be set by AuthContext
let logoutCallback: (() => void) | null = null;

export const setLogoutCallback = (callback: () => void) => {
  logoutCallback = callback;
};

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach token to requests when available.
apiClient.interceptors.request.use(async (config) => {
    const token = await getData('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle 401 errors globally
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.log("401 Unauthorized - Logging out");
            if (logoutCallback) {
                logoutCallback();
            }
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
        const response = await apiClient.get('/tasks/');
        
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

const AddTasks = async (data:task) =>{
    try{
         const response = await apiClient.post('/tasks/', data);
         return response.data;
    }catch(error){
        if(axios.isAxiosError(error) && error.response){
            console.error("Error adding task:", error.response.data);
        }else{
            console.error("Error adding task:", error);
        }
        throw error;
    }
}

export { signUpUser, loginUser, fetchAllTasks, AddTasks };