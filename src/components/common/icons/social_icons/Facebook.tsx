import React, { FC } from 'react';

type IconPropsType = {
    className?: string;
    fill?: string;
};

export const FacebookIcon: FC<IconPropsType> = ({ className, fill }) => {
    return (
        <svg
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M9.38184 17.36C4.96356 17.36 1.38184 13.7783 1.38184 9.35999C1.38184 4.94171 4.96356 1.35999 9.38184 1.35999C13.8001 1.35999 17.3818 4.94171 17.3818 9.35999C17.3818 13.7783 13.8001 17.36 9.38184 17.36ZM9.38184 17.36V7.75999C9.38184 6.87633 10.0982 6.15999 10.9818 6.15999H12.1818M6.58184 10.96H12.1818'
                stroke='#58A826'
            />
        </svg>
    );
};
