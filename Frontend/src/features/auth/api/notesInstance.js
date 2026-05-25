import axios from "axios"

const notesInstance = axios.create({
    baseURL: "http://localhost:3000/api/notes",
    withCredentials: true
})

export default notesInstance
