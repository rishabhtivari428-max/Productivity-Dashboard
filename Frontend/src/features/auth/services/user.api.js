import { axiosInstance } from '../api/axiosInstance.js'

export async function loginUser(email, password) {
    const response = await axiosInstance.post("/auth/login", { email, password });
    return response.data;
}

export async function registerUser(username, email, password) {
    const response = await axiosInstance.post("/auth/register", { username, email, password });
    return response.data;
}

export async function getMe() {
    const response = await axiosInstance.get("/auth/getme");
    return response.data;
}

export async function logoutUser() {
    await axiosInstance.post("/auth/logout");
}