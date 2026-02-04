import React from 'react';
import CategoryBadge from './CategoryBadge';
import ResourceButton from './ResourceButton';

const LearningCard = ({ item, isFavorite, onToggleFavorite, onComplete }) => {
    if (!item) return null;

    return (
        <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Decorative side panel */}
            <div className={`md:w-4 flex items-center justify-center ${item.category === 'Technology' ? 'bg-blue-500' :
                    item.category === 'Science' ? 'bg-purple-500' :
                        item.category === 'Math' ? 'bg-emerald-500' :
                            item.category === 'Creativity' ? 'bg-orange-500' :
                                item.category === 'Life Skills' ? 'bg-rose-500' : 'bg-slate-500'
                }`}></div>

            <div className="flex-1 p-8 md:p-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-2 flex-wrap">
                        <CategoryBadge category={item.category} />
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-slate-200">
                            {item.level}
                        </span>
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-slate-200 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            {item.time} min
                        </span>
                    </div>
                    <button
                        onClick={() => onToggleFavorite(item)}
                        className={`p-2 rounded-full transition-colors ${isFavorite
                                ? 'text-amber-500 bg-amber-50'
                                : 'text-slate-300 hover:text-slate-400 hover:bg-slate-50'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </button>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                    {item.title}
                </h2>

                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                    {item.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {item.resources.map((resource, index) => (
                        <ResourceButton
                            key={index}
                            resource={resource}
                            onClick={() => onComplete(item.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningCard;
