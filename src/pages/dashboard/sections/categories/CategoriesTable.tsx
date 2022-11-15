import { Table } from '@mantine/core';
import ICategory from 'src/interfaces/ICategory';
import ISubCategory from 'src/interfaces/ISubCategory';
import ISubCategoryType from 'src/interfaces/ISubCategoryType';

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
                    {/* <th>SubCategoryType (3 level)</th> */}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};
