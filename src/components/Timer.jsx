import React, { useState, useEffect, useCallback } from 'react';

const Timer = ({ initialMinutes = 15, onComplete }) => {
    const [seconds, setSeconds] = useState(initialMinutes * 60);
    const [isActive, setIsActive] = useState(false);

    const toggle = () => setIsActive(!isActive);

    const reset = useCallback(() => {
        setSeconds(initialMinutes * 60);
        setIsActive(false);
    }, [initialMinutes]);

    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            clearInterval(interval);
            setIsActive(false);
            if (onComplete) onComplete();
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, onComplete]);

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((initialMinutes * 60 - seconds) / (initialMinutes * 60)) * 100;

    return (
        <div className="flex flex-col items-center gap-4 p-6 glass rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-lg text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800">Focus Timer</h3>
            </div>

            <div className="text-4xl font-mono font-bold text-slate-900 tracking-tighter">
                {formatTime(seconds)}
            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-indigo-600 transition-all duration-300 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex gap-2 w-full">
                <button
                    onClick={toggle}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${isActive
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                >
                    {isActive ? 'Pause' : 'Start Timer'}
                </button>
                <button
                    onClick={reset}
                    className="py-2 px-4 rounded-lg font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Timer;
