import { Grid, Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IClub } from 'src/interfaces/IClub';
import { axiosInstance } from 'utils/instance';
import { ClubCard } from './Card';
import { CreateClubsForm } from './form';

export const Clubs = () => {
    const { push } = useRouter();
    const [clubs, setClubs] = useState([]);
    const [currentClub, setCurrentClub] = useState<IClub>();

    const fetchClubs = () => {
        axiosInstance.get(`/clubs`).then(({ data }) => {
            setClubs(data);
        });
    };

    const handleEdit = (club: IClub) => {
        setCurrentClub(club);
        push('/dashboard/clubs/2');
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
                                <ClubCard
                                    data={item}
                                    url={`/clubs/${item.id}`}
                                    handleEdit={() => handleEdit(item)}
                                />
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Tabs.Panel>

            <Tabs.Panel value='2' pt='xl'>
                <CreateClubsForm currentClub={currentClub!} />
            </Tabs.Panel>
        </CustomTabs>
    );
};
