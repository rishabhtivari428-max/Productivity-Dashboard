import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { notesAuth } from '../hooks/notesAuth'

const EditNote = () => {
    const { id } = useParams()
    const { notes, fetchNotes, editNotes } = notesAuth()
    const navigate = useNavigate()

    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const [isSubmitting, setisSubmitting] = useState(false)

    useEffect(() => {
        if (notes.length === 0) {
            fetchNotes();
        }
    }, [notes.length, fetchNotes]);

    useEffect(() => {
        const notesToEdit = notes.find(b => b._id === id || b.id === id);
        if (notesToEdit && !title) {
            settitle(notesToEdit.title || "");
            setcontent(notesToEdit.content || "");
        }
    }, [notes, id]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setisSubmitting(true)
        try {
            await editNotes(id, title, content)
            navigate("/dashboard")
        } catch (error) {
            console.log("Errro while updating Note: ", error)
        }
        finally {
            setisSubmitting(false)
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-black text-white p-4">
            <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Note</h1>
                    <p className="text-zinc-400 text-sm">Update your note's title and content</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Title</label>
                        <input
                            type="text"
                            placeholder="Note title"
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Content</label>
                        <textarea
                            placeholder="Tell your story..."
                            value={content}
                            onChange={(e) => setcontent(e.target.value)}
                            rows="6"
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all resize-y"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-2">
                        <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-3 rounded-xl font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditNote