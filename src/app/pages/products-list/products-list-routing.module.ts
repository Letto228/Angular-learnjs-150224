import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from './products-list.component';

const routes: Routes = [
    {
        path: ':subCategoryId',
        component: ProductsListComponent,
    },
    {
        path: '',
        component: ProductsListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsListRouting {}
