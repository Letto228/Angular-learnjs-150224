import {createAction} from '@ngrx/store';
import {Product} from '../../shared/products/product.interface';

export enum ProductsActionTypes {
    AddProducts = '[Products] Add products',
    LoadProducts = '[Products] Load products',
}

export const addProducts = createAction(ProductsActionTypes.AddProducts, (products: Product[]) => ({
    products,
}));

export const loadProducts = createAction(
    ProductsActionTypes.LoadProducts,
    (subcategoryId?: string | null) => ({
        subcategoryId,
    }),
);

// addProducts([...]) => {type: ProductsActionTypes.AddProducts, products: [...]}
