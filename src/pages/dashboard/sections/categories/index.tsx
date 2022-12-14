import { Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'utils/instance';
import { CategoriesTable } from './CategoriesTable';
import { CreateCategoriesForm } from './form';

export const Categories = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = () => {
        axiosInstance.get(`/categories`).then(({ data }) => {
            setCategories(data);
        });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CustomTabs>
            <Tabs.List>
                <Tabs.Tab value='1'>Barcha</Tabs.Tab>
                <Tabs.Tab value='2'>Yaratish</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='1' pt='xl'>
                <CategoriesTable data={categories} />
            </Tabs.Panel>

            <Tabs.Panel value='2' pt='xl'>
                <CreateCategoriesForm />
            </Tabs.Panel>
        </CustomTabs>
    );
};
