import React from 'react';

export const ArrowNext = ({ className, fill }: { className?: string; fill?: string }) => {
    return (
        <svg
            width='48'
            height='48'
            viewBox='0 0 48 48'
            className={className}
            fill='#354B62'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M35.9999 24.5L28.4999 20.1699V28.8301L35.9999 24.5ZM11.9999 25.25H29.2499V23.75H11.9999V25.25Z'
                fill={fill ?? 'current'}
            />
        </svg>
    );
};
