import { Grid, Pagination, Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import { IFact } from 'src/interfaces/IFact';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';
import { FactCard } from './FactCard';
import { CreateFactsForm } from './form';
import { UpdateFactForm } from './form/update';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('components/common/editor'), {
    ssr: false,
});

export interface Story {
    id: number;
    link: string;
    url: string;
    type: string;
}

export interface Datum {
    story: Story[];
}

export interface IFacts {
    data: Datum[];
    total: number;
    page: number;
}

export const Facts: FC = () => {
    const { push } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;
    const [page, setPage] = useState<number>(1);
    const [facts, setFacts] = useState<IFacts>({
        data: [
            {
                story: [],
            },
        ],
        total: 0,
        page: 0,
    });
    const [currentFact, setCurrentFact] = useState<IFact>();

    const fetchFacts = async () => {
        await axiosInstance
            .get(`/facts?page=${page}&limit=12`, {
                headers: {
                    authorization: `Bearer ${userInfo!.token}`,
                },
            })
            .then(({ data }) => {
                setFacts(data);
            })
            .catch(({ response }) => {
                console.log('Facts fetch error: ', response);
            });
    };

    const handleUpdate = (fact: IFact) => {
        setCurrentFact(fact);
        push('/dashboard/facts/3');
    };

    const handlePagination = (e: any) => {
        setPage(e);
    };

    useEffect(() => {
        fetchFacts();
    }, [page]);

    return (
        <div className='w-full'>
            <CustomTabs>
                <Tabs.List>
                    <Tabs.Tab value='1'>Barcha</Tabs.Tab>

                    {!currentFact && <Tabs.Tab value='2'>Yaratish</Tabs.Tab>}
                    {currentFact && <Tabs.Tab value='3'>O`zgartirish</Tabs.Tab>}
                </Tabs.List>

                <Tabs.Panel value='1' pt='xl'>
                    <Grid>
                        {facts?.data?.map((item: any) => {
                            return item.story?.map((i: any) => {
                                return (
                                    <Grid.Col xs={6} sm={6} md={4} lg={4} xl={3} key={i.id}>
                                        <FactCard data={i} handleUpdate={() => handleUpdate(i)} />
                                    </Grid.Col>
                                );
                            });
                        })}
                    </Grid>
                    {facts.data?.length > 0 && facts.data && (
                        <Pagination
                            total={facts.total}
                            className='my-6 flex justify-center'
                            onChange={handlePagination}
                        />
                    )}
                </Tabs.Panel>

                {!currentFact && (
                    <Tabs.Panel value='2' pt='xl'>
                        <CreateFactsForm />
                    </Tabs.Panel>
                )}

                {currentFact && (
                    <Tabs.Panel value='3' pt='xl'>
                        <UpdateFactForm currentFact={currentFact!} />
                    </Tabs.Panel>
                )}
            </CustomTabs>
        </div>
    );
};
