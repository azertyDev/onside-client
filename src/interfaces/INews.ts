'use strict';

import ICategory from './ICategory';
import { IImage } from './IImage';
import { NewsType } from './INewsType';
import ISubCategory from './ISubCategory';

export interface INews {
    id?: number;
    views?: number;
    category: ICategory;
    categoryId?: number;
    subCategoryId?: number;
    subCategoryTypeId?: number;
    subCategory: ISubCategory;
    text: string;
    type: NewsType;
    editorText: string;
    image: IImage;
    nameLink: string;
    link: string;
    author: string;
    authorLink: string;
    likes?: number;
    comment?: number;
    amountRating?: number;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date | null;
    publishedAt?: string;
}
