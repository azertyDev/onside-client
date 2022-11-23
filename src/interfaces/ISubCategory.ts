'use strict';

import ISubCategoryType from './ISubCategoryType';

export default interface ISubCategory {
    map(arg0: (item: ISubCategory) => void): unknown;
    id: number;
    name: string;
    parentId?: number;
    menu: ISubCategoryType[];
}
