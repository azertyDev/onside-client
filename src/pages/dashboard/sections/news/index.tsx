import { Checkbox, Grid, Select, Tabs } from '@mantine/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { axiosInstance } from 'utils/instance';
import { CustomTabs } from 'components/common/tabs';
import { CreateNewsForm } from './form';
import { ImageCard } from './ImageCard';
import { INews } from 'src/interfaces/INews';
import { Pagination } from '@mantine/core';
import { useRouter } from 'next/router';

export const News = () => {
    const { push } = useRouter();
    const [news, setNews] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [currentNews, setCurrentNews] = useState<INews>();
    const [newsType, setNewsType] = useState<string | null>('');
    const [isPublic, setIsPublic] = useState<boolean>(false);

    const newsTypes = [
        { label: 'Тип новостей', value: '' },
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

    const toggleIsPublic = (event: ChangeEvent<HTMLInputElement>) => {
        setIsPublic(event.currentTarget.checked);
        // push(`/dashboard/news/1?isPublic=${Number(isPublic)}`);
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
                    <Tabs.Tab value='1'>Все</Tabs.Tab>
                    <Tabs.Tab value='2'>Создать</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='1' pt='xl'>
                    <div className='flex gap-4 items-center mb-8'>
                        <Select
                            value={newsType}
                            data={newsTypes}
                            onChange={setNewsType}
                            placeholder='Выбрать тип новостей'
                        />
                        <Checkbox
                            checked={isPublic}
                            label='Опубликованные'
                            onChange={(event) => setIsPublic(event.currentTarget.checked)}
                        />
                    </div>
                    <Grid>
                        {news?.data?.map((item: INews) => {
                            return (
                                <Grid.Col xs={6} sm={6} md={6} lg={4} xl={3} key={item.id}>
                                    <ImageCard data={item} handleEditNews={handleEditNews} />
                                </Grid.Col>
                            );
                        })}
                    </Grid>
                    {news.data?.length > 0 && news.data && (
                        <Pagination
                            total={news.total}
                            className='my-6 flex justify-center'
                            onChange={handlePagination}
                        />
                    )}
                </Tabs.Panel>

                <Tabs.Panel value='2' pt='xl'>
                    <CreateNewsForm currentNews={currentNews!} />
                </Tabs.Panel>
            </CustomTabs>
        </div>
    );
};
