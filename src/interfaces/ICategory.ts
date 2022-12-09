
import ISubCategory from "./ISubCategory";
import ISubCategoryType from "./ISubCategoryType";

export default interface ICategory {
  id: number;
  name: string;
  menu:ISubCategory[];
  subMenu:ISubCategoryType[];
}
