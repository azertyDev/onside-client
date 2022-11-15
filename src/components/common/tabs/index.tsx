import { useRouter } from 'next/router';
import { Tabs, TabsValue } from '@mantine/core';
import { ReactNode } from 'react';

type CustomTabsProps = {
    onTabChange?: (e: TabsValue) => void;
    children: ReactNode;
};

export const CustomTabs = ({ children, onTabChange }: CustomTabsProps) => {
    const router = useRouter();
    const slug = (router.query.slug as string[]) || [];

    return (
        <Tabs
            defaultValue='1'
            sx={{ width: '100%' }}
            value={slug[1]}
            onTabChange={
                onTabChange ? onTabChange : (value) => router.push(`/dashboard/${slug[0]}/${value}`)
            }
        >
            {children}
        </Tabs>
    );
};
