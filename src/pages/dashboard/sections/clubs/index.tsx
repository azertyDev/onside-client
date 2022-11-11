import { Grid, Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { useEffect, useState } from 'react';
import { IClub } from 'src/interfaces/IClub';
import { baseURL } from 'utils/constants';
import { axiosInstance } from 'utils/instance';
import { ClubCard } from './Card';
import { CreateClubsForm } from './form';

export const Clubs = () => {
    const [clubs, setClubs] = useState([]);

    const fetchClubs = () => {
        axiosInstance.get(`${baseURL}/clubs`).then(({ data }) => {
            setClubs(data);
        });
    };

    useEffect(() => {
        fetchClubs();
    }, []);

    return (
        <CustomTabs>
            <Tabs.List>
                <Tabs.Tab value='1'>Все</Tabs.Tab>
                <Tabs.Tab value='2'>Создать</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='1' pt='xl'>
                <Grid>
                    {clubs?.map((item: IClub) => {
                        return (
                            <Grid.Col md={6} lg={3} key={item.id}>
                                <ClubCard {...item} />
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Tabs.Panel>

            <Tabs.Panel value='2' pt='xl'>
                <CreateClubsForm />
            </Tabs.Panel>
        </CustomTabs>
    );
};
