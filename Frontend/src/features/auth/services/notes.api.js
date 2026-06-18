import notesInstance from "../api/notesInstance";

export async function createNotes(title, content) {
    const response = await notesInstance.post("notes/create", {
        title,
        content
    })
    return response.data
}

export async function getNotes() {
    const response = await notesInstance.get('notes/get')
    return response.data
}

export async function updateNotes(id, title, content) {
    const response = await notesInstance.patch(`notes/update/${id}`, { title, content })
    return response.data
}

export async function deleteNotes(id) {
    const response = await notesInstance.delete(`notes/delete/${id}`)
    return response.data
}



