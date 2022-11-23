import { Grid, Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IChempionship } from 'src/interfaces/IChempionship';
import { axiosInstance } from 'utils/instance';
import { ClubCard } from '../clubs/Card';
import { CreateChampionshipForm } from './form';

export const Championships = () => {
    const { push } = useRouter();
    const [championships, setChampionships] = useState([]);
    const [currentChampionship, setCurrentChampionship] = useState<IChempionship>();

    const fetchChampionships = () => {
        axiosInstance.get(`/chempionships`).then(({ data }) => {
            setChampionships(data);
        });
    };

    const handleEdit = (championships: IChempionship) => {
        setCurrentChampionship(championships);
        push('/dashboard/championship/2');
    };

    useEffect(() => {
        fetchChampionships();
    }, []);

    return (
        <CustomTabs>
            <Tabs.List>
                <Tabs.Tab value='1'>Barcha</Tabs.Tab>
                <Tabs.Tab value='2'>Yaratish</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='1' pt='xl'>
                <Grid>
                    {championships?.map((item: any) => {
                        return (
                            <Grid.Col md={6} lg={3} key={item.id}>
                                <ClubCard
                                    data={item}
                                    url={`/chempionships/${item.id}`}
                                    handleEdit={() => handleEdit(item)}
                                />
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Tabs.Panel>

            <Tabs.Panel value='2' pt='xl'>
                <CreateChampionshipForm
                    currentChampionship={currentChampionship!}
                    setCurrentChampionship={setCurrentChampionship!}
                />
            </Tabs.Panel>
        </CustomTabs>
    );
};
