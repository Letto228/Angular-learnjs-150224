import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {CarouselModule} from '../../shared/carousel/carousel.module';
import {ProductComponent} from './product.component';
import {TypeModule} from './type/type.module';
import {DescriptionModule} from './description/description.module';

@NgModule({
    declarations: [ProductComponent],
    imports: [
        CommonModule,
        CarouselModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        TypeModule,
        DescriptionModule,
    ],
    exports: [ProductComponent],
})
export class ProductModule {}
