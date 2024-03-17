import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationDirective} from './pagination.directive';

@NgModule({
    declarations: [PaginationDirective],
    exports: [PaginationDirective],
    imports: [CommonModule],
})
export class PaginationModule {}
