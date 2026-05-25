import React, { useEffect, useState } from 'react'
import { activityAuth } from '../hooks/activityAuth'

const ActivityPage = () => {
    const [title, settitle] = useState("")
    const { activity, addActivity, removeActivity, fetchActivities, loading } = activityAuth()
    const [isSubmitting, setisSubmitting] = useState(false)

    useEffect(() => {
        fetchActivities()
    }, [fetchActivities])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim()) return

        setisSubmitting(true)
        try {
            await addActivity(title)
            settitle("")
        } catch (error) {
            console.log("Error while creating activity:", error)
        } finally {
            setisSubmitting(false)
        }
    }
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this activity?")) {
            await removeActivity(id)
        }
    }
    return (
        <div className="min-h-[80vh] flex flex-col items-center bg-black text-white p-4 py-12">
            <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl mb-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Activities</h1>
                    <p className="text-zinc-400 text-sm">Add a new activity to track your progress</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            placeholder="Activity title"
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-2">
                        <button disabled={isSubmitting} type="submit" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
                            {isSubmitting ? "Adding..." : "Add Activity"}
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 px-2">Your Activities</h2>
                {loading ? (
                    <div className="flex justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                ) : activity.length === 0 ? (
                    <div className="text-center p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                        <p className="text-zinc-400">No activities found. Add one above!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {activity.map(act => (
                            <div key={act._id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center hover:border-zinc-700 transition-colors shadow-lg">
                                <p className="text-lg text-zinc-100 font-medium">{act.title}</p>
                                <button 
                                    onClick={() => handleDelete(act._id)}
                                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                    title="Delete Activity"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActivityPage