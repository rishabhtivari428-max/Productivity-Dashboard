import axiosInstance from "./axios.instance";   

export async function createActivity(title) {
    const response = await axiosInstance.post("/api/activity/create", { title });
    return response.data;
}

export async function getActivity() {
    const response = await axiosInstance.get("/api/activity/get");
    return response.data;
}

export async function deleteActivity(id) {
    const response = await axiosInstance.delete(`/api/activity/delete/${id}`);
    return response.data;
}