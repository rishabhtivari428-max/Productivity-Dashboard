import React, { createContext, useCallback, useState } from 'react'
import { createNotes, getNotes, updateNotes, deleteNotes } from "../services/notes.api"

export const NotesContext = createContext()

export function NotesProvider({ children }) {
    const [notes, setnotes] = useState([])
    const [loading, setloading] = useState(false)

    const fetchNotes = useCallback(async () => {
        setloading(true)
        try {
            const response = await getNotes()
            setnotes(response.notes || [])
        } catch (error) {
            console.log("Error while fetching notes:", error)
        } finally {
            setloading(false)
        }
    }, [])

    const addNotes = async (title, content) => {
        try {
            const response = await createNotes(title, content)

            if (response.note) {
                setnotes(prev => [...prev, response.note])
            }
            return response
        } catch (error) {
            console.log("Error while creating note:", error)
        }
    }

    const editNotes = async (id, title, content) => {
        try {
            const response = await updateNotes(id, title, content)

            if (response.note) {
                setnotes(prev => prev.map(note => note._id === id ? response.note : note)
                )
            }
            return response
        } catch (error) {
            console.log("Error while updating note:", error)
        }
    }

    const removeNotes = async (id) => {
        try {
            await deleteNotes(id)
            setnotes(prev => prev.filter(note => note._id !== id))
        } catch (error) {
            console.log("Error while deleting note:", error)
        }
    }

    return (
        <NotesContext.Provider value={{ notes, loading, fetchNotes, addNotes, editNotes, removeNotes }}>
            {children}
        </NotesContext.Provider>
    )
}