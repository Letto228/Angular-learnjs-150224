import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs';
import {Store} from '@ngrx/store';
import {addProducts, loadProducts} from './products.actions';
import {ProductsApiService} from '../../shared/products/products-api.service';
import {State} from '../reducer';

@Injectable()
export class ProductsEffects {
    private readonly actions$ = inject(Actions);
    private readonly productsApiService = inject(ProductsApiService);
    private readonly store$ = inject(Store<State>);

    // loadProducts = createEffect(
    //     () =>
    //         this.actions$.pipe(
    //             // filter(action => action.type === loadProducts.type) ~ ofType(loadProducts)
    //             ofType(loadProducts),
    //             switchMap(({subcategoryId}) =>
    //                 this.productsApiService.getProducts$(subcategoryId).pipe(
    //                     tap(products => {
    //                         this.store$.dispatch(addProducts(products));
    //                     }),
    //                 ),
    //             ),
    //         ),
    //     {dispatch: false},
    // );
    loadProducts = createEffect(
        () =>
            this.actions$.pipe(
                // filter(action => action.type === loadProducts.type) ~ ofType(loadProducts)
                ofType(loadProducts),
                switchMap(({subcategoryId}) =>
                    this.productsApiService
                        .getProducts$(subcategoryId)
                        .pipe(map(products => addProducts(products))),
                ),
            ),
        // {dispatch: true},
    );
}
