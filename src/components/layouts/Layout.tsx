import { FC, ReactNode } from 'react';
// import { Footer } from 'components/footer';
// import { Header } from 'components/header';
// import { CustomHead } from 'components/common';

type LayoutPropsType = {
    meta?: {
        title: string;
        content: string;
    };
    children: ReactNode;
};

export const Layout: FC<LayoutPropsType> = (props) => {
    return (
        <>
            {/* <CustomHead {...props.meta} /> */}
            {/* <Header /> */}
            <main>{props.children}</main>
            {/* <Footer /> */}
        </>
    );
};
