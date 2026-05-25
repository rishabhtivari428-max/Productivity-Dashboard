import React from 'react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const { handleRegister, loading, error } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await handleRegister(username, email, password)
            navigate('/login')
        } catch (error) {
            console.log("Error while registering: ", error)
        }
    }

    if (loading) {
        return (<main>
            <h1>Loading...</h1>
        </main>)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome</h1>
                    <p className="text-zinc-400 text-sm">Please enter your details to register</p>
                </div>
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            placeholder="Enter your Username"
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                            required
                        />
                        <label className="text-sm font-medium text-zinc-300 ml-1">E-Mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all active:scale-[0.98]">Register</button>
                    <p className="text-center text-sm text-zinc-400 mt-2">
                        Already have an account?{' '}
                        <button type="button" onClick={() => navigate('/login')} className="text-red-500 hover:text-red-400 font-medium transition-colors">
                            Login
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register