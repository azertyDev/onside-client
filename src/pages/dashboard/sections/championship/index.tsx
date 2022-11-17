import { Grid, Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'utils/instance';
import { ClubCard } from '../clubs/Card';

export const Championships = () => {
    const [championships, setChampionships] = useState([]);

    const fetchChampionships = () => {
        axiosInstance.get(`/chempionships`).then(({ data }) => {
            setChampionships(data);
        });
    };

    useEffect(() => {
        fetchChampionships();
    }, []);

    return (
        <CustomTabs>
            <Tabs.List>
                <Tabs.Tab value='1'>Все</Tabs.Tab>
                <Tabs.Tab value='2'>Создать</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='1' pt='xl'>
                <Grid>
                    {championships?.map((item: any) => {
                        return (
                            <Grid.Col md={6} lg={3} key={item.id}>
                                <ClubCard {...item} />
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Tabs.Panel>

            <Tabs.Panel value='2' pt='xl'>
                <div>Form</div>
                {/* <CreateClubsForm /> */}
            </Tabs.Panel>
        </CustomTabs>
    );
};
