import { ActionIcon, Group, Table } from '@mantine/core';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import dayjs from 'dayjs';
import React from 'react';
import { IMatchCenter } from 'src/interfaces/IMatchCenter';
import { DeleteModal } from '../slider/Card';

export const MatchTable = ({ data }: { data: IMatchCenter[] }) => {
    const date = (value: string) => {
        return dayjs(value).locale('ru').format('DD-MMMM-YYYY HH:mm');
    };

    const rows = data?.map((element, index) => (
        <tr key={index}>
            <td>{element.host}</td>
            <td>{element.guest}</td>
            <td>{date(element.date)}</td>
            <td>
                <Group spacing='sm' position='right'>
                    <ActionIcon>
                        <EditIcon />
                    </ActionIcon>
                    <DeleteModal url={`/matches/${element.id}`} />
                </Group>
            </td>
        </tr>
    ));

    return (
        <Table striped withColumnBorders>
            <thead>
                <tr>
                    <th>Хозяева</th>
                    <th>Гости</th>
                    <th>Дата</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};
