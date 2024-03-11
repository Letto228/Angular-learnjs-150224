import {NgModule} from '@angular/core';
import {InfinityScrollDirective} from './infinity-scroll.directive';

@NgModule({
    declarations: [InfinityScrollDirective],
    exports: [InfinityScrollDirective],
})
export class InfinityScrollModule {}
