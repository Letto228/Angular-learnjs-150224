import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const isStringValidator: ValidatorFn = (
    control: AbstractControl,
): ValidationErrors | null => {
    const hasError = !!Number(control.value);

    return hasError ? {isStringValidator: `Is value: ${control.value} - number`} : null;
};
