import axios from 'axios'

const API_ORIGIN = import.meta.env.VITE_API_URL || (import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://productivity-dashboard-hp2x.onrender.com')

export const API_BASE_URL = `${API_ORIGIN.replace(/\/+$/, '')}/api/auth`

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// }, (error) => {
//     return Promise.reject(error)
// })

export default axiosInstance
