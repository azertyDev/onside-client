import { Table } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';
import { IMatchCenter } from 'src/interfaces/IMatchCenter';

export const MatchTable = ({ data }: { data: IMatchCenter[] }) => {
    const date = (value: string) => {
        return dayjs(value).locale('ru').format('DD-MMMM-YYYY HH:mm');
    };

    const rows = data?.map((element, index) => (
        <tr key={index}>
            <td>{element.host}</td>
            <td>{element.guest}</td>
            <td>{date(element.date)}</td>
        </tr>
    ));

    return (
        <Table striped withColumnBorders>
            <thead>
                <tr>
                    <th>Хозяева</th>
                    <th>Гости</th>
                    <th>Дата</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};
