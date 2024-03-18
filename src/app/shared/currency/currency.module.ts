import {NgModule} from '@angular/core';
import {CurrencyPipe} from './currency.pipe';

@NgModule({
    declarations: [CurrencyPipe],
    exports: [CurrencyPipe],
})
export class CurrencyModule {}
