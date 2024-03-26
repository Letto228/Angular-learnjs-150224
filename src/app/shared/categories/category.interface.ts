import {ISubCategory} from './sub-category.interface';

export interface ICategory {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id: string;
    name: string;
    subCategories: ISubCategory[];
}
