import axios from "axios"

const notesInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:3000" : "https://productivity-dashboard-hp2x.onrender.com"),
    withCredentials: true
})

export default notesInstance
