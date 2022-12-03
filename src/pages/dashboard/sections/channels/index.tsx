import { Grid, Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IChannel } from 'src/interfaces/IСhannel';
import { axiosInstance } from 'utils/instance';
import { ClubCard } from '../clubs/Card';
import { CreateChannelForm } from './form';

export const Channels = () => {
    const { push } = useRouter();
    const [channels, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState<IChannel>();

    const fetchChannels = () => {
        axiosInstance.get(`/channels`).then(({ data }) => {
            setChannels(data);
        });
    };

    const handleEdit = (channel: IChannel) => {
        setCurrentChannel(channel);
        push('/dashboard/championship/2');
    };

    useEffect(() => {
        fetchChannels();
    }, []);

    return (
        <CustomTabs>
            <Tabs.List>
                <Tabs.Tab value='1'>Barcha</Tabs.Tab>
                <Tabs.Tab value='2'>Yaratish</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='1' pt='xl'>
                <Grid>
                    {channels?.map((item: any) => {
                        return (
                            <Grid.Col md={6} lg={3} key={item.id}>
                                <ClubCard
                                    data={item}
                                    url={`/channels/${item.id}`}
                                    handleEdit={() => handleEdit(item)}
                                />
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Tabs.Panel>

            <Tabs.Panel value='2' pt='xl'>
                <CreateChannelForm
                    currentChannel={currentChannel!}
                    setCurrentChannel={setCurrentChannel!}
                />
            </Tabs.Panel>
        </CustomTabs>
    );
};
