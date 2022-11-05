import React, { FC } from 'react';

type IconPropsType = {
    className?: string;
    fill?: string;
    size?: string;
};

export const ChevronNext: FC<IconPropsType> = ({ className, fill, size = 36 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 36 36'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M14.0605 26.971L22.546 18.4855L14.0605 10L13 11.0605L20.425 18.4855L13 25.9105L14.0605 26.971Z'
                fill={fill ?? 'current'}
            />
        </svg>
    );
};
