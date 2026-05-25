import { NotesContext } from "../context/NotesContext";
import { useContext } from "react";

export function notesAuth() {
    const context = useContext(NotesContext)
    return context
}

