import {createReducer, on} from '@ngrx/store';
import {productsAdapter, productsInitialState} from './products.state';
import {addProducts} from './products.actions';

export const productsReducer = createReducer(
    productsInitialState,
    // on(addProducts, (state, action) => ({
    //     ...state,
    //     data: action.products,
    // })),
    on(addProducts, (state, {products}) => productsAdapter.setAll(products, state)),
);
