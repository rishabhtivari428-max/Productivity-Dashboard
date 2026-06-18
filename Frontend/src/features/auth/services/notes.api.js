import axiosInstance from "./axiosInstance";

export async function createNotes(title, content) {
    const response = await axiosInstance.post("/api/notes/create", { title, content });
    return response.data;
}

export async function getNotes() {
    const response = await axiosInstance.get('/api/notes/get');
    return response.data;
}

export async function updateNotes(id, title, content) {
    const response = await axiosInstance.patch(`/api/notes/update/${id}`, { title, content });
    return response.data;
}

export async function deleteNotes(id) {
    const response = await axiosInstance.delete(`/api/notes/delete/${id}`);
    return response.data;
}