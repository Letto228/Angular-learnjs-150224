import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-counter-input',
    templateUrl: './counter-input.component.html',
    styleUrls: ['./counter-input.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line no-use-before-define
            useExisting: CounterInputComponent,
            multi: true,
        },
    ],
})
export class CounterInputComponent implements ControlValueAccessor {
    @Input() step = 1;

    counter = 0;
    isDisabled = false;

    private onChange: (newCounter: number) => void = () => {
        console.error('Привязка к инпуту не установлена');
    };

    private onTouched: () => void = () => {
        console.error('Привязка к инпуту не установлена');
    };

    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    writeValue(nextCounter: number): void {
        this.counter = nextCounter;

        // eslint-disable-next-line no-console
        console.log('writeValue', this.counter);

        this.changeDetectorRef.markForCheck();
    }

    /**
     * (newCounter: number) => {
     *      control.setValue(newCounter);
     * }
     */
    registerOnChange(cb: (newCounter: number) => void): void {
        this.onChange = cb;
    }

    registerOnTouched(cb: () => void): void {
        this.onTouched = cb;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    back() {
        this.counter -= this.step;

        this.onChange(this.counter);
        this.onTouched();

        // eslint-disable-next-line no-console
        console.log('back', this.counter);
    }

    next() {
        this.counter += this.step;

        this.onChange(this.counter);
        this.onTouched();

        // eslint-disable-next-line no-console
        console.log('next', this.counter);
    }
}
