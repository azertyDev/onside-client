import { FC } from 'react';

type IconPropsType = {
    className?: string;
    fill?: string;
};

export const DeleteIcon: FC<IconPropsType> = ({ className, fill }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`${className} h-6 w-6}`}
            fill='currentColor'
            viewBox='0 0 24 24'
            stroke={fill ?? 'currentColor'}
            strokeWidth={2}
        >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
    );
};
