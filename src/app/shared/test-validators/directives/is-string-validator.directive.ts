import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {isStringValidator} from '../is-string-validator';

@Directive({
    selector: '[appIsStringValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            // eslint-disable-next-line no-use-before-define
            useExisting: IsStringValidatorDirective,
            multi: true,
        },
    ],
})
export class IsStringValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return isStringValidator(control);
    }

    // validate = isStringValidator;
}
