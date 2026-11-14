import { axiosInstance } from '../api/axiosInstance.js'

export async function createNotes(title, content) {
    const response = await axiosInstance.post("/notes/create", { title, content });
    return response.data;
}

export async function getNotes() {
    const response = await axiosInstance.get('/notes/get');
    return response.data;
}

export async function updateNotes(id, title, content) {
    const response = await axiosInstance.patch(`/notes/update/${id}`, { title, content });
    return response.data;
}

export async function deleteNotes(id) {
    const response = await axiosInstance.delete(`/notes/delete/${id}`);
    return response.data;
}