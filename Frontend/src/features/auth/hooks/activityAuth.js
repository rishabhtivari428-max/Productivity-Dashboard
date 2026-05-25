import { ActivityContext } from "../context/ActivityContext";
import { useContext } from "react";

export function activityAuth() {
    const context = useContext(ActivityContext)
    return context
}