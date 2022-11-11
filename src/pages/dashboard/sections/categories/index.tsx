import { Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { useEffect, useState } from 'react';
import { baseURL } from 'utils/constants';
import { axiosInstance } from 'utils/instance';
import { CreateCategoriesForm } from './form';

export const Categories = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = () => {
        axiosInstance.get(`${baseURL}/categories`).then(({ data }) => {
            setCategories(data);
        });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CustomTabs>
            <Tabs.List>
                <Tabs.Tab value='1'>Все</Tabs.Tab>
                <Tabs.Tab value='2'>Создать</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='1' pt='xl'>
                {categories?.map((item: any) => {
                    return <div key={item.id}>{item.nameLink}</div>;
                })}
            </Tabs.Panel>

            <Tabs.Panel value='2' pt='xl'>
                <CreateCategoriesForm />
            </Tabs.Panel>
        </CustomTabs>
    );
};
