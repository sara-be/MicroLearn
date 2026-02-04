import React from 'react';

const CategoryBadge = ({ category }) => {
    const getCategoryStyles = (cat) => {
        switch (cat.toLowerCase()) {
            case 'technology':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'science':
                return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'math':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'creativity':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'life skills':
                return 'bg-rose-100 text-rose-700 border-rose-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCategoryStyles(category)}`}>
            {category}
        </span>
    );
};

export default CategoryBadge;
