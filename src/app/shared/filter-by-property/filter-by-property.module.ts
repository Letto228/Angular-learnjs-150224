import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterByPropertyPipe} from './filter-by-property.pipe';

@NgModule({
    declarations: [FilterByPropertyPipe],
    exports: [FilterByPropertyPipe],
    imports: [CommonModule],
})
export class FilterByPropertyModule {}
