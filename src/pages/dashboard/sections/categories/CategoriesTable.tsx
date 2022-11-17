import { ActionIcon, Group, Table } from '@mantine/core';
import { EditIcon } from 'components/common/icons/edit_icon/EditIcon';
import ICategory from 'src/interfaces/ICategory';
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
                <td>{element.name ? element.name : 'Пусто'}</td>
                <td>{element.menu.map((item: any) => `${item.name} `)}</td>
                <td>
                    <Group spacing='sm' position='right'>
                        <ActionIcon>
                            <EditIcon />
                        </ActionIcon>
                        <DeleteModal url={`/categories/${element.id}`} />
                    </Group>
                </td>
                {/* <td>{element.menu.map((item: ISubCategoryType) => console.log(item.name))}</td> */}
            </tr>
        );
    });

    return (
        <Table>
            <thead>
                <tr>
                    <th>Category (1 level)</th>
                    <th>Subcategory (2 level)</th>
                    <th>Действия</th>
                    {/* <th>SubCategoryType (3 level)</th> */}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};
