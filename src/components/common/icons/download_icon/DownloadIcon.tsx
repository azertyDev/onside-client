import React from 'react';

export const DownloadIcon = ({ className, fill }: { className?: string; fill?: string }) => {
    return (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            className={className}
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d='M12 16L16 11H13V4H11V11H8L12 16Z' fill={fill ?? 'current'} />
            <path
                d='M20 18H4V11H2V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V11H20V18Z'
                fill={fill ?? 'current'}
            />
        </svg>
    );
};
