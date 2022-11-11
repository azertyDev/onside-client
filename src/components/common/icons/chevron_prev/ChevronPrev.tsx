import React, { FC } from 'react';

type IconPropsType = {
    className?: string;
    fill?: string;
    size?: string;
};

export const ChevronPrev: FC<IconPropsType> = ({ className, fill, size = 36 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 36 36'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M21.4855 26.971L13 18.4855L21.4855 10L22.546 11.0605L15.121 18.4855L22.546 25.9105L21.4855 26.971Z'
                fill={fill ?? 'current'}
            />
        </svg>
    );
};
