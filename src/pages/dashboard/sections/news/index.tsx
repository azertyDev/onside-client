import dynamic from 'next/dynamic';
import { Grid, Select, Tabs } from '@mantine/core';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'utils/instance';
import { CustomTabs } from 'components/common/tabs';
import { ImageCard } from './ImageCard';
import { INews } from 'src/interfaces/INews';
import { Pagination } from '@mantine/core';
import { useRouter } from 'next/router';

const DynamicForm = dynamic(() => import('./form'), {
    ssr: false,
});

export const News = () => {
    const { push } = useRouter();
    const [news, setNews] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [currentNews, setCurrentNews] = useState<INews>();
    const [newsType, setNewsType] = useState<string | null>('');
    const [isPublic, setIsPublic] = useState<string | null>('');

    const publicValues = [
        {
            label: 'Chop etilgan',
            value: '1',
        },
        {
            label: 'Chop etilmagan',
            value: '0',
        },
    ];

    const newsTypes = [
        { label: 'COMMON', value: 'COMMON' },
        { label: 'INTERVIEW', value: 'INTERVIEW' },
        { label: 'BLOG', value: 'BLOG' },
        { label: 'SPORT', value: 'SPORT' },
        { label: 'PHOTO', value: 'PHOTO' },
        { label: 'VIDEO', value: 'VIDEO' },
    ];

    const fetchNews = async () => {
        await axiosInstance
            .get(
                `/news/byType?page=${page}&limit=12${newsType ? `&type=${newsType}` : ''}${
                    isPublic ? `&isPublic=${Number(isPublic)}` : ''
                }`
            )
            .then(({ data }) => {
                setNews(data);
            })
            .catch((error) => {
                console.log('News fetch error: ', error);
            });
    };

    const handleEditNews = (news: INews) => {
        setCurrentNews(news);
        push('/dashboard/news/2');
    };

    const handlePagination = (e: any) => {
        setPage(e);
    };

    useEffect(() => {
        fetchNews();
    }, [page, newsType, isPublic]);

    return (
        <div className='w-full'>
            <CustomTabs>
                <Tabs.List>
                    <Tabs.Tab value='1'>Barcha</Tabs.Tab>
                    <Tabs.Tab value='2'>Yaratish</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='1' pt='xl'>
                    <div className='flex gap-4 items-center mb-8'>
                        <Select
                            clearable
                            value={newsType}
                            data={newsTypes}
                            onChange={setNewsType}
                            placeholder='Yangilik turi'
                        />
                        <Select
                            clearable
                            value={isPublic}
                            data={publicValues}
                            onChange={setIsPublic}
                            placeholder='Holati'
                        />
                    </div>
                    <Grid>
                        {news?.data?.map((item: INews) => {
                            return (
                                <Grid.Col xs={6} sm={6} md={6} lg={4} xl={3} key={item.id}>
                                    <ImageCard
                                        data={item}
                                        url={`/news/${item.id}`}
                                        handleEditNews={handleEditNews}
                                    />
                                </Grid.Col>
                            );
                        })}
                    </Grid>
                    {news.data?.length >= 12 && news.data && (
                        <Pagination
                            total={news.total}
                            className='my-6 flex justify-center'
                            onChange={handlePagination}
                        />
                    )}
                </Tabs.Panel>

                <Tabs.Panel value='2' pt='xl'>
                    <DynamicForm currentNews={currentNews!} />
                </Tabs.Panel>
            </CustomTabs>
        </div>
    );
};
