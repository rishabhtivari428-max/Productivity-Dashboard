import notesInstance from "../api/notesInstance";

export async function createNotes(title, content) {
    const response = await notesInstance.post("/create", {
        title,
        content
    })
    return response.data
}

export async function getNotes() {
    const response = await notesInstance.get('/get')
    return response.data
}

export async function updateNotes(id, title, content) {
    const response = await notesInstance.patch(`/update/${id}`, { title, content })
    return response.data
}

export async function deleteNotes(id) {
    const response = await notesInstance.delete(`/delete/${id}`)
    return response.data
}


// http://localhost:3000/api/notes/delete/6a0750082d1f76e751b3a6a7
