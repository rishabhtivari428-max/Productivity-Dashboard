import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, getMe } from "../services/user.api";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(false)
    const [error, setError] = useState(null)

    const handleLogin = async (email, password) => {
        setloading(true)
        setError(null)
        try {
            const response = await loginUser(email, password)
            setuser(response.user)
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error while logging in"
            setError(errorMessage)
            console.log("Error while loggin you in: ", error)
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
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error while registering"
            setError(errorMessage)
            console.log("Error while registering you: ", error)
        }
        finally {
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
                    console.log("Error fetching user:", err);
                }
            }
        }
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error, handleLogin, handleRegister }}>
            {children}
        </AuthContext.Provider>
    )
}