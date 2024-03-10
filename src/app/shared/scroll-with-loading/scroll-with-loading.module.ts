import {NgModule} from '@angular/core';
import {ScrollWithLoadingDirective} from './scroll-with-loading.directive';

@NgModule({
    declarations: [ScrollWithLoadingDirective],
    exports: [ScrollWithLoadingDirective],
})
export class ScrollWithLoadingModule {}
