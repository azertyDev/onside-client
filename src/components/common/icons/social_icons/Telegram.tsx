import React, { FC } from 'react';

type IconPropsType = {
    className?: string;
    fill?: string;
};

export const TelegramIcon: FC<IconPropsType> = ({ className, fill }) => {
    return (
        <svg
            width='18'
            height='15'
            viewBox='0 0 18 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M16.9092 0.502838L0.90918 6.21712L5.48061 8.50284L12.3378 3.93141L7.76632 9.64569L14.6235 14.2171L16.9092 0.502838Z'
                stroke='#58A826'
                strokeLinejoin='round'
            />
        </svg>
    );
};
