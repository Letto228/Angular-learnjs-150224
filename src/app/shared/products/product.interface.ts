import {IProductImage} from './product-image.interface';

export interface IProduct {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id: string;
    name: string;
    price: number;
    images: IProductImage[];
    subCategory: string;
    feedbacksCount: number;
    rating: number;
}
