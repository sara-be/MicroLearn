import React, { useState, useEffect } from 'react';
import learningData from '../data/learningData.json';
import { getRandomItem } from '../utils/getRandomItem';
import { getFavorites, toggleFavorite, markAsCompleted, getStreak } from '../utils/storage';
import LearningCard from '../components/LearningCard';
import Timer from '../components/Timer';

const Home = () => {
    const [currentItem, setCurrentItem] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [streak, setStreak] = useState(0);
    const [showTimer, setShowTimer] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        setFavorites(getFavorites());
        setStreak(getStreak());
    }, []);

    const handleSurpriseMe = () => {
        let pool = learningData;
        if (activeCategory !== 'All') {
            pool = learningData.filter(item => item.category === activeCategory);
        }
        const item = getRandomItem(pool);
        setCurrentItem(item);
    };

    const handleToggleFavorite = (item) => {
        const newFavorites = toggleFavorite(item);
        setFavorites(newFavorites);
    };

    const handleComplete = (id) => {
        markAsCompleted(id);
        setStreak(getStreak());
    };

    const categories = ['All', ...new Set(learningData.map(item => item.category))];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center min-h-screen">
            {/* Header Section */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-4 border border-indigo-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    {streak > 0 ? `Your Streak: ${streak} day${streak > 1 ? 's' : ''} 🔥` : 'Start your learning journey'}
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                    Micro<span className="text-indigo-600">Learn</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
                    You have 15 minutes. Eliminate decision fatigue and learn something new today.
                </p>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${activeCategory === cat
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleSurpriseMe}
                    className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transform hover:-translate-y-1 active:translate-y-0"
                >
                    <svg className="w-6 h-6 mr-3 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Surprise Me
                </button>
            </div>

            {/* Main Content Area */}
            <div className="w-full flex flex-col lg:flex-row gap-8 items-start justify-center">
                {currentItem ? (
                    <div className="w-full flex flex-col items-center gap-8">
                        <LearningCard
                            item={currentItem}
                            isFavorite={favorites.some(f => f.id === currentItem.id)}
                            onToggleFavorite={handleToggleFavorite}
                            onComplete={handleComplete}
                        />

                        <div className="flex flex-col items-center gap-4 w-full">
                            {!showTimer ? (
                                <button
                                    onClick={() => setShowTimer(true)}
                                    className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    Need a focus timer?
                                </button>
                            ) : (
                                <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-300">
                                    <div className="flex justify-between items-center mb-2 px-2">
                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recommended</span>
                                        <button onClick={() => setShowTimer(false)} className="text-slate-400 hover:text-slate-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </div>
                                    <Timer onComplete={() => alert('Well done! You completed your 15-minute learning session. 🎉')} />
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10 opacity-40 select-none">
                        <div className="mb-6 inline-block p-6 rounded-full bg-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
                        </div>
                        <p className="text-slate-600 font-medium italic">Your next 15-minute breakthrough is just a click away.</p>
                    </div>
                )}
            </div>

            {/* Favorites Preview (if any) */}
            {favorites.length > 0 && (
                <div className="w-full mt-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h3 className="text-2xl font-bold text-slate-800 mb-8 px-4 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        Your Saved Topics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map(item => (
                            <div
                                key={item.id}
                                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                                onClick={() => setCurrentItem(item)}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                                        {item.category}
                                    </span>
                                </div>
                                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{item.title}</h4>
                                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
