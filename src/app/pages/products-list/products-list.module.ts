import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ScrollInfinityModule} from 'src/app/shared/scroll-infinity/scroll-infinity.module';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {DumpNgIfModule} from '../../shared/dump-ng-if/dump-ng-if.module';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [
        CommonModule,
        CardModule,
        DumpNgIfModule,
        MatProgressSpinnerModule,
        ScrollInfinityModule,
    ],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
