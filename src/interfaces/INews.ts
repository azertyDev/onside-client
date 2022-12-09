'use strict';

import ICategory from './ICategory';
import { IImage } from './IImage';
import { NewsType } from './INewsType';
import ISubCategory from './ISubCategory';
import ISubCategoryType from './ISubCategoryType';
import IVideo from './IVideo';

export interface INews {
    iframe?: string;
    id?: number;
    views?: number;
    category: ICategory;
    categoryId?: number;
    subCategoryId?: number;
    subCategoryTypeId?: number;
    subCategoryType?: ISubCategoryType;
    subCategory: ISubCategory;
    text: string;
    type: NewsType;
    editorText: string;
    image: IImage;
    video?:IVideo;
    nameLink: string;
    link: string;
    authorId: number;
    author: {
        name: string;
        surname: string;
    };
    authorLink: string;
    likes?: number;
    comment?: number;
    amountRating?: number;
    amountViews?:number;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date | null;
    publishedAt?: string;
}
