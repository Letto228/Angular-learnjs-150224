import {NgModule} from '@angular/core';
import {InsertShadowDirective} from './insert-shadow.directive';

@NgModule({
    declarations: [InsertShadowDirective],
    exports: [InsertShadowDirective],
})
export class InsertShadowModule {}
