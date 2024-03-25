import {NgModule} from '@angular/core';
import {PaginationDirective} from './pagination.directive';

@NgModule({
    declarations: [PaginationDirective],
    exports: [PaginationDirective],
})
export class PaginationModule {}
