import { FC } from 'react';
import Link, { LinkProps } from 'next/link';

type NextLinkProps = {
    children?: any;
    className?: string;
    onClick?: () => void;
} & LinkProps;

export const NextLink: FC<NextLinkProps> = ({ children, className, onClick, ...props }) => {
    return (
        <Link {...props} passHref>
            <a className={className} onClick={onClick}>
                {children && children}
            </a>
        </Link>
    );
};
