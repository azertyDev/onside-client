import { ActionIcon, Menu, NavLink, Table } from '@mantine/core';
import { SettingsIcon } from 'components/common/icons';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import { DeleteModal } from '../slider/Card';

const settingsMenu = (id: number, type: string) => {
    const handleUpdate = (id: number) => {
        console.log(id);
    };

    return (
        <Menu withinPortal position='bottom' shadow='sm'>
            <Menu.Target>
                <ActionIcon>
                    <SettingsIcon fill='#228be6' />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <div className='flex gap-2'>
                    <DeleteModal url={`${type}/${id}`} reloadPage={false} />
                    <ActionIcon color='blue' onClick={() => handleUpdate(id)}>
                        <EditIcon className='w-6 h-6' />
                    </ActionIcon>
                </div>
            </Menu.Dropdown>
        </Menu>
    );
};

export const CategoriesTable = (props: any) => {
    const rows = props.data.map((element: any) => {
        return (
            <tr key={element.name}>
                <td rowSpan={1}>
                    <NavLink
                        component='span'
                        label={element.name}
                        childrenOffset={28}
                        icon={settingsMenu(element.id, 'categories')}
                    >
                        {element.menu && (
                            <NavLink label='menu' component='span' childrenOffset={28}>
                                {element.menu?.map((i: any) => {
                                    return (
                                        <NavLink
                                            key={i.id}
                                            label={i.name}
                                            component='span'
                                            childrenOffset={28}
                                            icon={settingsMenu(i.id, 'categories/menu')}
                                        />
                                    );
                                })}
                            </NavLink>
                        )}
                        {element.subMenu && (
                            <NavLink label='subMenu' component='span' childrenOffset={28}>
                                {element.subMenu?.map((j: any) => {
                                    return (
                                        <NavLink
                                            key={j.id}
                                            label={j.name}
                                            component='span'
                                            childrenOffset={28}
                                            icon={settingsMenu(j.id, 'categories/subMenu')}
                                        />
                                    );
                                })}
                            </NavLink>
                        )}
                    </NavLink>
                </td>
            </tr>
        );
    });

    return (
        <Table striped highlightOnHover withColumnBorders>
            <thead>
                <tr>
                    <th>Kategoriyalar</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};
