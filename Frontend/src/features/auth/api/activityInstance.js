import axios from "axios";

const activityInstance = axios.create({
    baseURL: "http://localhost:3000/api/activity",
    withCredentials: true
})

export default activityInstance