import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollInfinityDirective} from './scroll-infinity.directive';

@NgModule({
    declarations: [ScrollInfinityDirective],
    imports: [CommonModule],
    exports: [ScrollInfinityDirective],
})
export class ScrollInfinityModule {}
