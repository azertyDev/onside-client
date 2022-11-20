import { Grid, Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { FC, useContext, useEffect, useState } from 'react';
import { IFact } from 'src/interfaces/IFact';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';
import { FactCard } from './FactCard';
import { CreateFactsForm } from './form';

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
    const { params } = useContext(Store);
    const { userInfo } = params;
    const [facts, setFacts] = useState<IFacts>({
        data: [
            {
                story: [],
            },
        ],
        total: 0,
        page: 0,
    });

    const fetchFacts = async () => {
        await axiosInstance
            .get('/facts', {
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

    useEffect(() => {
        fetchFacts();
    }, []);

    return (
        <div className='w-full'>
            <CustomTabs>
                <Tabs.List>
                    <Tabs.Tab value='1'>Все</Tabs.Tab>
                    <Tabs.Tab value='2'>Создать</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='1' pt='xl'>
                    <Grid>
                        {facts?.data?.map((item: any) => {
                            return item.story?.map((i: any) => {
                                return (
                                    <Grid.Col xs={6} sm={6} md={4} lg={4} xl={3} key={i.id}>
                                        <FactCard {...i} />
                                    </Grid.Col>
                                );
                            });
                        })}
                    </Grid>
                </Tabs.Panel>

                <Tabs.Panel value='2' pt='xl'>
                    <CreateFactsForm />
                </Tabs.Panel>
            </CustomTabs>
        </div>
    );
};
