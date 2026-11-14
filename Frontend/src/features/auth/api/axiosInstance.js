import axios from 'axios'

export const API_ORIGIN = (import.meta.env.VITE_API_URL || 'https://productivity-dashboard-hp2x.onrender.com')
    .replace(/\/+$/, '')
export const API_BASE_URL = API_ORIGIN.endsWith('/api') ? API_ORIGIN : `${API_ORIGIN}/api`


export const axiosInstance = axios.create({
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
