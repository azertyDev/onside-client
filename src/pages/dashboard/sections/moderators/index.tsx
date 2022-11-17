import { Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { IUser } from 'src/interfaces/IUser';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';
import { CreateModeratorsForm } from './form';
import { ModeratorsTable } from './ModeratorsTable';

export const Moderators = () => {
    const { push } = useRouter();
    const { params } = useContext(Store);
    const { userInfo } = params;
    const [moderators, setModerators] = useState<IUser[]>([]);
    const [current, setCurrent] = useState<IUser>();

    const handleEdit = (moder: IUser) => {
        setCurrent(moder);
        push('/dashboard/moderators/2');
    };

    const fetchModerators = async () => {
        await axiosInstance
            .get('/moderators', {
                headers: {
                    authorization: `Bearer ${userInfo!.token}`,
                },
            })
            .then(({ data }) => {
                setModerators(data);
            })
            .catch(({ response }) => {
                console.log('News fetch error: ', response);
            });
    };

    useEffect(() => {
        fetchModerators();
    }, []);

    return (
        <div className='w-full'>
            <CustomTabs>
                <Tabs.List>
                    <Tabs.Tab value='1'>Все</Tabs.Tab>
                    <Tabs.Tab value='2'>Создать</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='1' pt='xl'>
                    <ModeratorsTable data={moderators} handleEdit={handleEdit} />
                </Tabs.Panel>

                <Tabs.Panel value='2' pt='xl'>
                    <CreateModeratorsForm current={current} />
                </Tabs.Panel>
            </CustomTabs>
        </div>
    );
};
