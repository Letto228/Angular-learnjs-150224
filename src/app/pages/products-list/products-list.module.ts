import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardModule} from 'src/app/pages/products-list/card/card.module';
import {ProductsListComponent} from './products-list.component';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [CommonModule, CardModule],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
