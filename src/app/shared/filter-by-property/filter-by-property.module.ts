import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterByPropertyPipe} from './filter-by-property.pipe';

@NgModule({
    declarations: [FilterByPropertyPipe],
    imports: [CommonModule],
    exports: [FilterByPropertyPipe],
})
export class FilterByPropertyModule {}
