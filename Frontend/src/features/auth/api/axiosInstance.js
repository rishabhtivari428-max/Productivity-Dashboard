import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://productivity-dashboard-hp2x.onrender.com",
    withCredentials: true
});

export default axiosInstance;