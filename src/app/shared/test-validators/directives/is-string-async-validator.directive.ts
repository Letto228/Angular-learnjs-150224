import {ChangeDetectorRef, Directive, inject} from '@angular/core';
import {
    AbstractControl,
    AsyncValidator,
    NG_ASYNC_VALIDATORS,
    ValidationErrors,
} from '@angular/forms';
import {Observable, map, tap, timer} from 'rxjs';

@Directive({
    selector: '[appIsStringAsyncValidator]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            // eslint-disable-next-line no-use-before-define
            useExisting: IsStringAsyncValidatorDirective,
            multi: true,
        },
    ],
})
export class IsStringAsyncValidatorDirective implements AsyncValidator {
    private readonly changeDetectorRef = inject(ChangeDetectorRef);
    private readonly service = {
        checkControlValue(controlValue: string): Observable<boolean> {
            return timer(3000).pipe(map(() => !!Number(controlValue)));
        },
    };

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.service.checkControlValue(control.value).pipe(
            map(hasError => (hasError ? {isStringAsyncValidator: 'Input other value'} : null)),
            tap(() => {
                this.changeDetectorRef.markForCheck();
            }),
        );
    }
}
