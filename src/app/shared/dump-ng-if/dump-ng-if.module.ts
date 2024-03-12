import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DumpNgIfDirective} from './dump-ng-if.directive';

@NgModule({
    declarations: [DumpNgIfDirective],
    imports: [CommonModule],
    exports: [DumpNgIfDirective],
})
export class DumpNgIfModule {}
