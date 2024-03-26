import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PropertyFilterPipe} from './property-filter.pipe';

@NgModule({
    declarations: [PropertyFilterPipe],
    imports: [CommonModule],
    exports: [PropertyFilterPipe],
})
export class PropertyFilterModule {}
