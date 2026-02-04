import React from 'react';

const ResourceButton = ({ resource, onClick }) => {
    const isVideo = resource.type === 'video';

    return (
        <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${isVideo
                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200'
                }`}
        >
            {isVideo ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            )}
            <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] uppercase tracking-wider opacity-70">
                    {isVideo ? 'Watch' : 'Read'}
                </span>
                <span className="text-sm font-bold">{resource.label}</span>
            </div>
        </a>
    );
};

export default ResourceButton;
