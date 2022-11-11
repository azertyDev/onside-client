"use strict";

import ISubCategory from "./ISubCategory";

export default interface ICategory {
  id: number;
  name: string;
  menu:ISubCategory;
}
