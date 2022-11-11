import React from 'react';

export const AddIcon = ({ className, fill }: { className?: string; fill?: string }) => {
    return (
        <svg
            width='17'
            height='16'
            viewBox='0 0 17 16'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
        >
            <rect x='8.13477' width='1.23077' height='16' rx='0.5' fill={fill ?? 'current'} />
            <rect
                x='0.75'
                y='8.61523'
                width='1.23077'
                height='16'
                rx='0.5'
                transform='rotate(-90 0.75 8.61523)'
                fill={fill ?? 'current'}
            />
        </svg>
    );
};
