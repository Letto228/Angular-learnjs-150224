import {NgModule} from '@angular/core';
import {ProductsFilterPipe} from './products-filter.pipe';

@NgModule({
    declarations: [ProductsFilterPipe],
    exports: [ProductsFilterPipe],
})
export class ProductsFilterModule {}
