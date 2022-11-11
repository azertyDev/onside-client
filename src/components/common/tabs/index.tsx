import { useRouter } from 'next/router';
import { Tabs } from '@mantine/core';

export const CustomTabs = ({ children }: any) => {
    const router = useRouter();
    const slug = (router.query.slug as string[]) || [];

    return (
        <Tabs
            defaultValue='1'
            sx={{ width: '100%' }}
            value={slug[1]}
            onTabChange={(value) => router.push(`/dashboard/${slug[0]}/${value}`)}
        >
            {children}
        </Tabs>
    );
};
