import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    inject,
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ProductsFilter} from '../products-filter.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges, OnInit {
    @Input() brands: string[] | null = null;

    @Output() changeFilter = new EventEmitter<ProductsFilter>();

    // private readonly changeDetectorRef = inject(ChangeDetectorRef);

    // readonly nameControl = new FormControl('', {
    //     validators: [Validators.minLength(3), Validators.required],
    //     asyncValidators: [this.isStringAsyncValidator.bind(this)],
    //     // asyncValidators: [(...args) => this.isStringAsyncValidator(...args)],
    //     // asyncValidators: [isStringAsyncValidator.bind(this)],
    //     // updateOn: 'blur',
    // });

    // readonly error$ = this.nameControl.statusChanges.pipe(
    //     map(status => (status === 'INVALID' ? this.nameControl.errors : null)),
    //     startWith(this.nameControl.errors),
    //     distinctUntilChanged(),
    // );

    // private readonly service = {
    //     checkControlValue(controlValue: string): Observable<boolean> {
    //         return timer(3000).pipe(map(() => !!Number(controlValue)));
    //     },
    // };

    // private isStringAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    //     return this.service.checkControlValue(control.value).pipe(
    //         map(hasError => (hasError ? {isStringAsyncValidator: 'Input other value'} : null)),
    //         tap(() => {
    //             this.changeDetectorRef.markForCheck();
    //         }),
    //     );
    // }

    // --------------------------------------------------------

    // readonly form = new FormGroup({
    //     name: new FormControl(''),
    //     brands: new FormArray<FormControl<boolean | null>>([]),
    //     priceRange: new FormGroup({
    //         min: new FormControl(0),
    //         max: new FormControl(999999),
    //     }),
    // });

    private readonly formBuilder = inject(FormBuilder);

    readonly form = this.formBuilder.group({
        // name: [{value: '', disabled: true}, {validators: [Validators.required]}],
        name: ['', {validators: [Validators.required]}],
        brands: this.formBuilder.array<FormControl<boolean | null>>([]),
        priceRange: this.formBuilder.group(
            {
                min: 0,
                max: 999999,
            },
            {validators: []},
        ),
    });

    ngOnChanges({brands}: SimpleChanges): void {
        if (brands) {
            this.updateBrandsControl();
        }
    }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit(): void {
        // this.form.valueChanges
        //     .pipe(
        //         map(formValue => ({
        //             ...formValue,
        //             brands: this.getSelectedBrands(formValue.brands),
        //         })),
        //     )
        //     .subscribe(console.log);
        // combineLatest([
        //     this.form.get('name')?.valueChanges,
        //     this.form.get('brands')?.valueChanges
        // ])
        // this.form.get('name')?.valueChanges.subscribe(console.log);
        // (this.form.get('brands') as FormArray)
    }

    private updateBrandsControl() {
        const brandsControls = this.brands?.length
            ? this.brands.map(() => new FormControl(false))
            : [];

        const brandsFormArray = new FormArray(brandsControls);

        this.form.setControl('brands', brandsFormArray);
    }

    private getSelectedBrands(brandsSelection: Array<boolean | null> | undefined): string[] {
        return brandsSelection && this.brands?.length
            ? this.brands.filter((_name, index) => brandsSelection[index])
            : [];
    }
}
