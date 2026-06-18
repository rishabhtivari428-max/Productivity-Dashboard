import axios from "axios"

const notesInstance = axios.create({
    baseURL: "https://dashboard-1-ozpd.onrender.com",
    withCredentials: true
})

export default notesInstance
