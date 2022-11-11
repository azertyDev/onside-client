import { Grid, Table, Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { useEffect, useState } from 'react';
import { IMatchCenter } from 'src/interfaces/IMatchCenter';
import { baseURL } from 'utils/constants';
import { axiosInstance } from 'utils/instance';
import { MatchCard } from './Card';
import { CreateMatchForm } from './form';
import { MatchTable } from './MatchTable';

export const Matches = () => {
    const [matches, setMatches] = useState<IMatchCenter[]>([]);

    const fetchMatches = () => {
        axiosInstance.get(`${baseURL}/matches`).then(({ data }) => {
            setMatches(data);
        });
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    const rows = matches?.map((element) => (
        <tr key={element.id}>
            <td>{element.host}</td>
            <td>{element.guest}</td>
            <td>{element.date}</td>
        </tr>
    ));

    return (
        <CustomTabs>
            <Tabs.List>
                <Tabs.Tab value='1'>Все</Tabs.Tab>
                <Tabs.Tab value='2'>Создать</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='1' pt='xl'>
                <MatchTable data={matches}/>
            </Tabs.Panel>

            <Tabs.Panel value='2' pt='xl'>
                <CreateMatchForm />
            </Tabs.Panel>
        </CustomTabs>
    );
};
