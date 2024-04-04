import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    inject,
} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Observable, Subject, debounceTime, map, takeUntil} from 'rxjs';
import {ProductsFilter} from '../products-filter.interface';
import {ProductsFilterForm} from '../products-filter-form.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges, OnInit, OnDestroy {
    @Input() brands: string[] | null = null;
    @Input() initialFilter: ProductsFilter | null = null;

    // Output by EventEmitter
    // ------------------------
    @Output() changeFilter = new EventEmitter<ProductsFilter>();
    // ------------------------
    //
    // Output by stream
    // ------------------------
    // @Output() readonly changeFilter: Observable<ProductsFilter>;
    // ------------------------

    private readonly destroy$ = new Subject<void>();
    private readonly formBuilder = inject(FormBuilder);

    readonly form = this.formBuilder.group({
        name: '',
        brands: this.formBuilder.array<FormControl<boolean | null>>([]),
        priceRange: this.formBuilder.group({
            min: 0,
            max: 999999,
        }),
    });

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
        // Output by stream
        // ------------------------
        // Необходимо делать это в конструкторе, т.к. при создании потока нужна уже созданная форма (form)
        // this.changeFilter = this.getFilterStream$();
        // ------------------------
    }

    ngOnChanges({brands}: SimpleChanges): void {
        if (brands) {
            this.updateBrandsControl();
        }
    }

    ngOnInit() {
        // Output by EventEmitter
        // ------------------------
        this.listenFormChange();
        // ------------------------
        this.updateInitialFormValue();
    }

    // Output by EventEmitter
    // ------------------------
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    // ------------------------

    private updateBrandsControl() {
        const savedBrands = this.initialFilter?.brands || [];

        const brandsControls: boolean[] = this.brands
            ? this.brands.map(brand => savedBrands.includes(brand))
            : [];

        const brandsFormArray = this.formBuilder.array(brandsControls);

        this.form.setControl('brands', brandsFormArray);
    }

    // Output by EventEmitter
    // ------------------------
    private listenFormChange() {
        const changeFormValue$ = this.form.valueChanges as Observable<ProductsFilterForm>;

        changeFormValue$
            .pipe(
                debounceTime(300),
                map(formValue => ({
                    ...formValue,
                    brands: this.getSelectedBrands(formValue.brands as boolean[]),
                })),
                takeUntil(this.destroy$),
            )
            .subscribe(filter => {
                this.changeFilter.emit(filter as ProductsFilter);
            });
    }
    // ------------------------

    private getSelectedBrands(brandSelection: boolean[]): ProductsFilter['brands'] {
        return this.brands ? this.brands.filter((_brand, index) => brandSelection[index]) : [];
    }

    private updateInitialFormValue() {
        const {name, priceRange} = this.initialFilter || {};

        this.form.patchValue({name, priceRange});
    }

    // Output by stream
    // ------------------------
    // private getFilterStream$(): Observable<ProductsFilter> {
    //     return this.form.valueChanges.pipe(
    //         map(
    //             ({brands, name, ...otherValues}) =>
    //                 ({
    //                     ...otherValues,
    //                     name,
    //                     brands: this.getSelectedBrands(brands as boolean[]),
    //                 } as ProductsFilter),
    //         ),
    //     );
    // }
    // ------------------------
}
