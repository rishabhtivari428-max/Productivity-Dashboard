import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-[50vh]' role="status" aria-label="Loading account">
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500'></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoutes