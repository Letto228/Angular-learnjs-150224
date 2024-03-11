import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppScrollWithLoadingDirective} from './app-scroll-with-loading.directive';

@NgModule({
    declarations: [AppScrollWithLoadingDirective],
    imports: [CommonModule],
    exports: [AppScrollWithLoadingDirective],
})
export class AppScrollWithLoadingModule {}
