import { Grid, Tabs } from '@mantine/core';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'utils/instance';
import { CustomTabs } from 'components/common/tabs';
import { CreateNewsForm } from './form';
import { ImageCard } from './ImageCard';
import { INews } from 'src/interfaces/INews';
import { Pagination } from '@mantine/core';

export const News = () => {
    const [news, setNews] = useState<any>([]);
    const [page, setPage] = useState<number>(1);

    const fetchNews = async () => {
        await axiosInstance
            .get(`/news/byType?page=${page}&limit=9`)
            .then(({ data }) => {
                setNews(data);
            })
            .catch((error) => {
                console.log('News fetch error: ', error);
            });
    };

    const handlePagination = (e: any) => {
        setPage(e);
    };

    useEffect(() => {
        fetchNews();
    }, [page]);

    return (
        <div className='w-full'>
            <CustomTabs>
                <Tabs.List>
                    <Tabs.Tab value='1'>Все</Tabs.Tab>
                    <Tabs.Tab value='2'>Создать</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='1' pt='xl'>
                    <Grid>
                        {news?.data?.map((item: INews) => {
                            return (
                                <Grid.Col md={6} lg={4} key={item.id}>
                                    <ImageCard {...item} />
                                </Grid.Col>
                            );
                        })}
                    </Grid>
                    <Pagination
                        total={news.total}
                        className='my-6 flex justify-center'
                        onChange={handlePagination}
                    />
                </Tabs.Panel>

                <Tabs.Panel value='2' pt='xl'>
                    <CreateNewsForm />
                </Tabs.Panel>
            </CustomTabs>
        </div>
    );
};
