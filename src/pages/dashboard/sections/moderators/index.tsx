import { Grid, Tabs } from '@mantine/core';
import { AxiosResponse } from 'axios';
import { CustomTabs } from 'components/common/tabs';
import { useContext, useEffect, useState } from 'react';
import IUser from 'src/interfaces/IUser';
import { axiosInstance } from 'utils/instance';
import { Store } from 'utils/Store';
import { CreateModeratorsForm } from './form';
import { ModeratorsTable } from './ModeratorsTable';

export const Moderators = () => {
    const { params } = useContext(Store);
    const { userInfo } = params;
    const [moderators, setModerators] = useState<IUser[]>([]);

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

    console.log(moderators);

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
                    <ModeratorsTable data={moderators} />
                </Tabs.Panel>

                <Tabs.Panel value='2' pt='xl'>
                    <CreateModeratorsForm
                    // categories={categories}
                    // subCategories={subCategories}
                    // subCategoriesType={subCategoriesType}
                    />
                </Tabs.Panel>
            </CustomTabs>
        </div>
    );
};
