import React from 'react'

const Features = () => {
    const features = [
        { title: "Notes Management", desc: "Capture and organize your ideas seamlessly in a distraction-free environment." },
        { title: "Pomodoro Timer", desc: "Stay focused and beat procrastination with integrated time management." },
        { title: "Daily Planner", desc: "Plan your day efficiently and track your progress with our elegant planner." }
    ]

    return (
        <div className='max-w-7xl mx-auto py-24 px-6 relative z-10'>
            <div className='text-center mb-16'>
                <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Powerful Features</h2>
                <p className='text-zinc-400 max-w-xl mx-auto'>Everything you need to boost your productivity and take control of your day.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center'>
                {features.map((feature, i) => (
                    <div key={i} className='group relative bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 h-[320px] flex flex-col justify-center items-center text-center transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)] hover:-translate-y-2 overflow-hidden'>
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className='w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5'>
                            <div className='w-8 h-8 rounded-full bg-red-500/20 shadow-[0_0_15px_rgba(220,38,38,0.4)]'></div>
                        </div>
                        <h3 className='text-2xl font-bold text-white mb-3 z-10 group-hover:text-red-100 transition-colors'>{feature.title}</h3>
                        <p className='text-zinc-400 z-10 text-sm leading-relaxed'>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features