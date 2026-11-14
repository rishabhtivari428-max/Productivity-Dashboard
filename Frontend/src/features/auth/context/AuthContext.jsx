import { useState, useEffect } from "react";
import { loginUser, registerUser, getMe, logoutUser } from "../services/user.api";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)
    const [error, setError] = useState(null)

    const handleLogin = async (email, password) => {
        setloading(true)
        setError(null)
        try {
            const response = await loginUser(email, password)
            setuser(response.user)
            return response.user
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error while logging in"
            setError(errorMessage)
            return null
        }
        finally {
            setloading(false)
        }
    }

    const handleRegister = async (username, email, password) => {
        setloading(true)
        setError(null)
        try {
            const response = await registerUser(username, email, password)
            setuser(response.user)
            return response.user
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error while registering"
            setError(errorMessage)
            return null
        }
        finally {
            setloading(false)
        }
    }

    const handleLogout = async () => {
        setloading(true)
        setError(null)
        try {
            await logoutUser()
            setuser(null)
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error while logging out"
            setError(errorMessage)
            return false
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getMe();
                setuser(response.user);
            } catch (err) {
                if (err.response?.status !== 401) {
                    setError(err.response?.data?.message || "Unable to load your account")
                }
            } finally {
                setloading(false)
            }
        }
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}