import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
    const { user, loading, error, handleLogout } = useAuth()
    const navigate = useNavigate()

    const onLogout = async () => {
        const loggedOut = await handleLogout()
        if (loggedOut) {
            navigate('/')
        }
    }

    return (
        <nav className='sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 text-white font-bold transition-all'>
            <div className='max-w-7xl mx-auto flex justify-between items-center p-4 px-6'>
                <Link to={"/"}><h1 className='text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500'>Dash.</h1></Link>
                <div className='flex gap-6 items-center'>
                    {user ? (
                        <>
                            <span className='hidden sm:block text-sm text-zinc-400 font-medium'>{user.username || user.email}</span>
                            <Link to="/dashboard" className='text-sm text-zinc-300 hover:text-white transition-colors font-medium'>Dashboard</Link>
                            <button onClick={onLogout} disabled={loading} className='text-sm bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl transition-all font-semibold active:scale-95'>
                                {loading ? 'Please wait...' : 'Log out'}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to={"/login"} className='text-sm text-zinc-300 hover:text-white transition-colors font-medium'>Login</Link>
                            <Link to={"/register"} className='text-sm bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all font-semibold active:scale-95'>Register</Link>
                        </>
                    )}
                </div>
            </div>
            {error && user && <p role="alert" className="mx-auto max-w-7xl px-6 pb-3 text-right text-sm text-red-400">{error}</p>}
        </nav>
    )
}

export default Navbar