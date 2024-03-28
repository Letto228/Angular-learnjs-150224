import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from './products-list.component';
import {productsListMatcher} from './products-list-url-matcher';
// import {productsResolver} from '../../shared/test-guards/products.resolver';

const routes: Routes = [
    // {
    //     path: '',
    //     component: ProductsListComponent,
    // },
    // {
    //     path: ':subCategoryId',
    //     component: ProductsListComponent,
    // },
    {
        matcher: productsListMatcher,
        component: ProductsListComponent,
        // resolve: {
        //     productsStore: productsResolver,
        // },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsListRouting {}
