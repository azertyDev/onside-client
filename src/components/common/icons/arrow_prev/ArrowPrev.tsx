import React from 'react';

export const ArrowPrev = ({ className, fill }: { className?: string; fill?: string }) => {
    return (
        <svg
            width='48'
            height='48'
            viewBox='0 0 48 48'
            fill='#354B62'
            className={className}
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M12.0001 24.5L19.5001 20.1699V28.8301L12.0001 24.5ZM36.0001 25.25H18.7501V23.75H36.0001V25.25Z'
                fill={fill ?? 'current'}
            />
        </svg>
    );
};
