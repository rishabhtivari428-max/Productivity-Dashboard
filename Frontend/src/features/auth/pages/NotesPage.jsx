import React, { useEffect, useState } from 'react'
import { notesAuth } from '../hooks/notesAuth'

const NotesPage = () => {
    const { notes, fetchNotes, addNotes, editNotes, removeNotes, loading } = notesAuth()
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const [isSubmitting, setisSubmitting] = useState(false)
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        fetchNotes()
    }, [fetchNotes])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) return

        setisSubmitting(true)
        try {
            if (editingId) {
                await editNotes(editingId, title, content)
            } else {
                await addNotes(title, content)
            }
            settitle("")
            setcontent("")
            setEditingId(null)
        } catch (error) {
            console.log("Error saving note:", error)
        } finally {
            setisSubmitting(false)
        }
    }

    const handleEditClick = (note) => {
        settitle(note.title)
        setcontent(note.content)
        setEditingId(note._id || note.id)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCancelEdit = () => {
        settitle("")
        setcontent("")
        setEditingId(null)
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure? you want to delete this Note")) {
            await removeNotes(id)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 pt-24 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl sticky top-24">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {editingId ? "Edit Note" : "Create Note"}
                            </h2>
                            <p className="text-zinc-400 text-sm">
                                {editingId ? "Update your note's details below." : "Write a new note to add to your collection."}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-zinc-300 ml-1">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    placeholder="Note title"
                                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-zinc-300 ml-1">Content</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setcontent(e.target.value)}
                                    placeholder="Note Content"
                                    rows="5"
                                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all resize-y"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3 mt-2">
                                <button disabled={isSubmitting} type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
                                    {isSubmitting ? (editingId ? "Saving..." : "Publishing...") : (editingId ? "Save Changes" : "Publish Note")}
                                </button>
                                {editingId && (<button type="button" onClick={handleCancelEdit} className="w-full py-3 px-6 rounded-xl font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors">Cancel Edit</button>)}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="mb-6 flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Your Notes</h2>
                            <p className="text-zinc-400">Manage all your notes in one place</p>
                        </div>
                    </div>
                    {loading && notes.length === 0 ? (
                        <div className="text-center py-12 text-zinc-500">Loading notes...</div>
                    ) : notes.length === 0 ? (
                        <div className="bg-zinc-900/50 border border-dashed border-zinc-700 rounded-2xl p-12 text-center">
                            <p className="text-zinc-400 mb-2">No notes found.</p>
                            <p className="text-sm text-zinc-500">Create your first note using the form.</p>
                        </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {notes.map(note => (
                                <div key={note._id || note.id} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_8px_30px_rgba(220,38,38,0.05)] flex flex-col h-full group">
                                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-1">{note.title}</h3>
                                    <p className="text-zinc-400 text-sm mb-6 flex-grow whitespace-pre-wrap line-clamp-4">{note.content}</p>
                                    <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEditClick(note)} className="px-4 py-2 text-sm rounded-lg font-medium text-blue-400 bg-blue-400/10 hover:bg-blue-400/20 transition-colors">Edit</button>
                                        <button onClick={() => handleDelete(note._id || note.id)} className="px-4 py-2 text-sm rounded-lg font-medium text-red-400 bg-red-400/10 hover:bg-red-400/20 transition-colors">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NotesPage
