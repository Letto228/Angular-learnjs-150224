import {Product} from './product.interface';

export interface ProductsDto {
    data: {
        items: Product[];
    };
}
