import { FC, ReactNode } from 'react';

type LayoutPropsType = {
    meta?: {
        title: string;
        content: string;
    };
    children: ReactNode;
};

export const Layout: FC<LayoutPropsType> = ({ children }) => {
    return <main>{children}</main>;
};
