import { axiosInstance } from '../api/axiosInstance.js'

export async function createActivity(title) {
    const response = await axiosInstance.post("/activity/create", { title });
    return response.data;
}

export async function getActivity() {
    const response = await axiosInstance.get("/activity/get");
    return response.data;
}

export async function deleteActivity(id) {
    const response = await axiosInstance.delete(`/activity/delete/${id}`);
    return response.data;
}