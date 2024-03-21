import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from './pages/products-list/products-list.component';

const routes: Routes = [
    {
        path: 'products-list',
        component: ProductsListComponent,
    },
    // {
    //     path: 'product/id',
    //     component: ProductComponent,
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

/**
 * url === http://localhost:4200/product/id
 * urlSegments === product/id
 *
 * current url segments: ['product', 'id']
 *
 * search indexes: 0 -> 1 -> 2 -> 3 -> ...
 */

/**
 *                         undefined
 *                       /           \
 *                      /             \
 *          ['products-list']      ['product', 'id']
 */
