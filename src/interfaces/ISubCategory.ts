"use strict";

import ISubCategoryType from "./ISubCategoryType";

export default interface ISubCategory {
  id: number;
  name: string;
  subMenu:ISubCategoryType[];
}
