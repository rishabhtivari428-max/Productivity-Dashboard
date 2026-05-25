import React from 'react'
import { Link } from 'react-router-dom'
const Welcome = () => {
    return (
        <div className='relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden py-20 px-4'>
            {/* Background glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className='text-center z-10 max-w-4xl mx-auto'>
                <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-zinc-300">
                    ✨ Your ultimate productivity hub
                </div>
                <h1 className='text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-tight'>
                    Organize Your Day <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-800 animate-pulse">Smarter</span>
                </h1>
                <p className='mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed'>
                    Manage notes, track tasks, and stay focused with productivity tools in one beautifully integrated space.
                </p>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'>
                    <Link to="/register" className='inline-block w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl cursor-pointer font-semibold shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] transition-all hover:-translate-y-1 active:scale-95 text-center'>
                        Get Started
                    </Link>
                    <button className='w-full sm:w-auto px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800 border border-white/10 backdrop-blur-sm text-white rounded-xl cursor-pointer font-semibold transition-all hover:-translate-y-1 active:scale-95'>
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Welcome