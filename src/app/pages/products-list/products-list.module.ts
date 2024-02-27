import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [CommonModule, CardModule],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
