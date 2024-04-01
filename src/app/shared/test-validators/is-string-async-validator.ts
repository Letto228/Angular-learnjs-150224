import {ChangeDetectorRef} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable, map, tap} from 'rxjs';

export function isStringAsyncValidator(
    this: {
        service: {checkControlValue(controlValue: string): Observable<boolean>};
        changeDetectorRef: ChangeDetectorRef;
    },
    control: AbstractControl,
): Observable<ValidationErrors | null> {
    return this.service.checkControlValue(control.value).pipe(
        map(hasError => (hasError ? {isStringAsyncValidator: 'Input other value'} : null)),
        tap(() => {
            this.changeDetectorRef.markForCheck();
        }),
    );
}

// export const isStringAsyncValidator: AsyncValidatorFn = (
//     control: AbstractControl,
// ): Observable<ValidationErrors | null> => {
//     // const service = inject(Service);

//     const hasError = !!Number(control.value);

//     return hasError ? {isStringValidator: `Is value: ${control.value} - number`} : null;
// };
