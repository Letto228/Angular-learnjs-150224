import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NotFoundModule} from './pages/not-found/not-found.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/products-list',
        pathMatch: 'full',
    },
    {
        path: 'products-list',
        loadChildren: () =>
            import('./pages/products-list/products-list.module').then(m => m.ProductsListModule),
        // component: ProductsListComponent,
        // redirectTo: 'product/id',
        // pathMatch: 'prefix',
    },
    {
        path: 'product/:productId',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
        // component: ProductComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
        NotFoundModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

/**
 * url === http://localhost:4200/product/:id
 * urlSegments === product/:id
 *
 * current url segments: ['product', ':id']
 *
 * search indexes: 0 -> 1 -> 2 -> 3 -> ...
 */

/**
 *      ___________________undefined ___________________
 *     |                  /           \                  \
 *     |                 /             \                  \
 *    ['']     ['products-list']   ['product', ':id']     ['**']
 *                      __________/   /              \
 *                     /             /                \
 *                  ['']        ['description']       ['type']
 */
