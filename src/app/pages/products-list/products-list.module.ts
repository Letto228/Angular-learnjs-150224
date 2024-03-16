import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {InfiniteScrollModule} from '../../shared/infinite-scroll/infinite-scroll.module';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [CommonModule, CardModule, InfiniteScrollModule],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
