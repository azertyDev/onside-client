import { ActionIcon, Group, NavLink, Table } from '@mantine/core';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import ICategory from 'src/interfaces/ICategory';
import ISubCategory from 'src/interfaces/ISubCategory';
import { DeleteModal } from '../slider/Card';

export const CategoriesTable = (props: any) => {
    const rows = props.data.map((element: any) => {
        const category = element.menu.map((item: ICategory) => item.menu);

        // const subCategory = category.map((item: ISubCategory) => {
        //     return item.map((j: any) => {
        //         return j.name;
        //     });
        // });

        return (
            <tr key={element.name}>
                <td rowSpan={1}>
                    {element.name ? (
                        <NavLink component='span' label={element.name} childrenOffset={28}>
                            {element.menu.map((i: any) => {
                                return (
                                    <NavLink
                                        key={i.id}
                                        component='span'
                                        label={i.name}
                                        childrenOffset={28}
                                    >
                                        {i.menu.map((j: any) => {
                                            return (
                                                <NavLink
                                                    key={j.id}
                                                    label={j.name}
                                                    component='span'
                                                    childrenOffset={28}
                                                />
                                            );
                                        })}
                                    </NavLink>
                                );
                            })}
                        </NavLink>
                    ) : (
                        'Пусто'
                    )}
                </td>

                {/* <td>
                    <Group spacing='sm' position='right'>
                        <ActionIcon>
                            <EditIcon />
                        </ActionIcon>
                        <DeleteModal url={`/categories/${element.id}`} />
                    </Group>
                </td> */}
                {/* <td>{element.menu.map((item: ISubCategoryType) => console.log(item.name))}</td> */}
            </tr>
        );
    });

    return (
        <Table striped highlightOnHover withColumnBorders>
            <thead>
                <tr>
                    <th>Kategoriyalar</th>
                    {/* <th>SubCategoryType (3 level)</th> */}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};
