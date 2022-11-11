import { FC } from 'react';

type IconPropsType = {
    className?: string;
    fill?: string;
};

export const MessageIcon: FC<IconPropsType> = ({ className, fill }) => {
    return (
        <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            xmlns='http://www.w3.org/2000/svg'
            fill='#58A826'
            className={className}
        >
            <path
                d='M0.05 3.555C0.150818 3.11324 0.398655 2.71881 0.752922 2.43631C1.10719 2.1538 1.54688 1.99997 2 2H14C14.4531 1.99997 14.8928 2.1538 15.2471 2.43631C15.6013 2.71881 15.8492 3.11324 15.95 3.555L8 8.414L0.05 3.555ZM0 4.697V11.801L5.803 8.243L0 4.697ZM6.761 8.83L0.191 12.857C0.353327 13.1993 0.609527 13.4884 0.929782 13.6908C1.25004 13.8931 1.62117 14.0004 2 14H14C14.3788 14.0001 14.7498 13.8926 15.0698 13.6901C15.3899 13.4876 15.6459 13.1983 15.808 12.856L9.238 8.829L8 9.586L6.761 8.829V8.83ZM10.197 8.244L16 11.801V4.697L10.197 8.243V8.244Z'
                fill={fill ?? 'current'}
            />
        </svg>
    );
};