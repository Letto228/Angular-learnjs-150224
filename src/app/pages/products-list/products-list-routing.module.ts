import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from './products-list.component';
import {productsListMatcher} from './products-list-url-matcher';

const routes: Routes = [
    {
        matcher: productsListMatcher,
        component: ProductsListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsListRouting {}
