import React, { createContext, useCallback, useState } from "react";
import { createActivity, getActivity, deleteActivity } from "../services/activity.api";

export const ActivityContext = createContext();

export function ActivityProvider({ children }) {

    const [activity, setactivity] = useState([]);
    const [loading, setloading] = useState(false);

    const fetchActivities = useCallback(async () => {
        setloading(true);
        try {
            const response = await getActivity();
            setactivity(response.activity || []);
        } catch (error) {
            console.log("Error while fetching activities:", error);
        } finally {
            setloading(false);
        }
    }, []);

    const addActivity = async (title) => {
        try {
            const response = await createActivity(title);

            if (response.activity) {
                setactivity(prev => [...prev, response.activity]);
            }
            return response;
        } catch (error) {
            console.log("Error while creating activity:", error);
        }
    };

    const removeActivity = async (id) => {
        try {
            await deleteActivity(id);
            setactivity(prev => prev.filter(act => act._id !== id));
        } catch (error) {
            console.log("Error while deleting activity:", error);
        }
    };
    return (
        <ActivityContext.Provider value={{ activity, loading, addActivity, removeActivity, fetchActivities }}>
            {children}
        </ActivityContext.Provider>
    );
}