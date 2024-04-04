import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {Product} from '../../shared/products/product.interface';

export const productsFeature = 'products';

// export interface ProductsState {
//     data: Product[] | null;
//     filter: unknown | null;
// }
// export interface ProductsState {
//     entites: {[id: Product['_id']]: Product};
//     ids: Array<Product['_id']>;
//     filter: unknown | null;
// }
export interface ProductsState extends EntityState<Product> {
    filter: unknown | null;
}

export const productsAdapter = createEntityAdapter<Product>({
    // selectId: ({id}: {id: string | number}) => id,
    selectId: ({_id}: Product) => _id,
    // sortComparer:
});

export const productsInitialState: ProductsState = productsAdapter.getInitialState({
    filter: null,
});
