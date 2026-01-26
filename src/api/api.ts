
import axios from "axios";
import { API_BASE_URL } from "@env";

const signUpUser = async (username: string, email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        username,
        email,
        password
    });
    return response.data;
}

const loginUser = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
    });
    return response.data;
}

export { signUpUser, loginUser };