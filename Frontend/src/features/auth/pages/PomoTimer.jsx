import React, { useState, useEffect } from 'react'

const PomoTimer = () => {

    const [minutes, setminutes] = useState(25)
    const [seconds, setseconds] = useState(0)
    const [running, setrunning] = useState(false)

    useEffect(() => {
        let interval;

        if (running) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setseconds(prev => prev - 1)
                } else if (minutes > 0) {
                    setminutes(prev => prev - 1)
                    setseconds(59)
                } else {
                    setrunning(false)
                }
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [running, minutes, seconds])

    return (
        <div className='text-white flex flex-col items-center justify-center min-h-screen bg-black gap-6'>
            <h1 className='text-6xl font-bold'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            <div className='flex gap-4'>
                <button onClick={() => setrunning(true)} className='bg-green-600 px-6 py-3 rounded-xl'>Start</button>
                <button onClick={() => setrunning(false)} className='bg-yellow-600 px-6 py-3 rounded-xl'>Pause</button>
                <button onClick={() => {
                    setminutes(25)
                    setseconds(0)
                    setrunning(false)
                }} className='bg-red-600 px-6 py-3 rounded-xl'>Reset
                </button>

            </div>
        </div>
    )
}

export default PomoTimer