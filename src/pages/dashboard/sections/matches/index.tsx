import { Tabs } from '@mantine/core';
import { CustomTabs } from 'components/common/tabs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IMatchCenter } from 'src/interfaces/IMatchCenter';
import { axiosInstance } from 'utils/instance';
import { CreateMatchForm } from './form';
import { MatchTable } from './MatchTable';

export const Matches = () => {
    const { push } = useRouter();
    const [matches, setMatches] = useState<IMatchCenter[]>([]);
    const [currentMatch, setCurrentMatch] = useState<IMatchCenter>();

    const fetchMatches = () => {
        axiosInstance.get(`/matches`).then(({ data }) => {
            setMatches(data);
        });
    };

    const handleUpdate = (match: IMatchCenter) => {
        setCurrentMatch(match);
        push('/dashboard/match_center/2');
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
                <Tabs.Tab value='1'>Barcha</Tabs.Tab>
                <Tabs.Tab value='2'>Yaratish</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='1' pt='xl'>
                <MatchTable data={matches} handleUpdate={handleUpdate} />
            </Tabs.Panel>

            <Tabs.Panel value='2' pt='xl'>
                <CreateMatchForm currentMatch={currentMatch!} />
            </Tabs.Panel>
        </CustomTabs>
    );
};
