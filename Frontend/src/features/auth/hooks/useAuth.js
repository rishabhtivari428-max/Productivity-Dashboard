import { AuthContext } from "../context/AuthContextValue";
import { useContext } from "react";

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}