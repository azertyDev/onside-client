import { FC } from 'react';

type IconPropsType = {
    className?: string;
    fill?: string;
};

export const MenuIcon: FC<IconPropsType> = ({ className, fill }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            viewBox='0 0 24 24'
            fill='#354B62'
            stroke='currentColor'
            strokeWidth={2}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
                fill={fill ?? 'current'}
            />
        </svg>
    );
};
