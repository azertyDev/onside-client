import { ActionIcon, Menu, NavLink, Table } from '@mantine/core';
import { SettingsIcon } from 'components/common/icons';
import { UpdateModal } from 'components/common/updateModal';
import { useContext } from 'react';
import { Store } from 'utils/Store';
import { DeleteModal } from '../slider/Card';

const settingsMenu = (data: any, type: string) => {
    return (
        <Menu withinPortal position='bottom' shadow='sm'>
            <Menu.Target>
                <ActionIcon>
                    <SettingsIcon fill='#228be6' />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <div className='flex gap-2'>
                    <DeleteModal url={`${type}/${data.id}`} reloadPage={false} />
                    <UpdateModal url={`${type}`} data={data} />
                </div>
            </Menu.Dropdown>
        </Menu>
    );
};

export const CategoriesTable = (props: any) => {
    const { params } = useContext(Store);
    const { userInfo } = params;
    let showSettingsIcon = userInfo?.user.isAdmin ? settingsMenu : null;

    const rows = props.data.map((element: any) => {
        return (
            <tr key={element.name}>
                <td rowSpan={1}>
                    <NavLink
                        component='span'
                        label={element.name}
                        childrenOffset={28}
                        icon={userInfo?.user.isAdmin ? settingsMenu(element, 'categories') : null}
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
                                            icon={
                                                userInfo?.user.isAdmin
                                                    ? settingsMenu(i, 'categories/menu')
                                                    : null
                                            }
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
                                            icon={
                                                userInfo?.user.isAdmin
                                                    ? settingsMenu(j, 'categories/subMenu')
                                                    : null
                                            }
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
