import axios from "axios";

const activityInstance = axios.create({
    baseURL: "https://dashboard-1-ozpd.onrender.com",
    withCredentials: true
})

export default activityInstance