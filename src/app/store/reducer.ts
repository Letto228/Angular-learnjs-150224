import {productsReducer} from './products/products.reducer';
import {ProductsState, productsFeature} from './products/products.state';

export interface State {
    [productsFeature]: ProductsState;
}

export const storeReducer = {
    [productsFeature]: productsReducer,
};
