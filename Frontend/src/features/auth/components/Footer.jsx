import React from 'react'

const Footer = () => {
    return (
        <footer className='border-t border-white/10 bg-black/40 backdrop-blur-md mt-auto py-8 relative z-10'>
            <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4'>
                <div className='text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500'>
                    Dash.
                </div>
                <div className='text-zinc-500 text-sm font-medium'>
                    Made with <span className="text-red-500">♥</span> using React, Node, and Tailwind
                </div>
                <div className='flex gap-4 text-zinc-500'>
                    <a href="#" className="hover:text-white transition-colors text-sm">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors text-sm">Terms</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer