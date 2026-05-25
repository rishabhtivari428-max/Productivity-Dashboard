import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
    return (
        <nav className='sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 text-white font-bold transition-all'>
            <div className='max-w-7xl mx-auto flex justify-between items-center p-4 px-6'>
                <Link to={"/"}><h1 className='text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500'>Dash.</h1></Link>
                <div className='flex gap-6 items-center'>
                    <Link to={"/login"}><button className='text-sm text-zinc-300 hover:text-white transition-colors cursor-pointer font-medium'>Login</button></Link>
                    <Link to={"/register"}><button className='text-sm bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all cursor-pointer font-semibold active:scale-95'>Register</button></Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar