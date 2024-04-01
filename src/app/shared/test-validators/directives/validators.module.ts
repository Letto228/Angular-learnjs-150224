import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IsStringValidatorDirective} from './is-string-validator.directive';
import {IsStringAsyncValidatorDirective} from './is-string-async-validator.directive';

@NgModule({
    declarations: [IsStringValidatorDirective, IsStringAsyncValidatorDirective],
    imports: [CommonModule],
    exports: [IsStringValidatorDirective, IsStringAsyncValidatorDirective],
})
export class ValidatorsModule {}
