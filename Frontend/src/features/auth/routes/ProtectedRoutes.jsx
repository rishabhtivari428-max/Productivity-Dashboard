import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <div className='flex justify-center items-center h-[50vh]'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoutes