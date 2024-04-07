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
import {Subject, debounceTime, map, takeUntil} from 'rxjs';
import {ProductsFilter} from '../products-filter.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges, OnInit, OnDestroy {
    @Input() brands: string[] | null = null;
    @Input() initialFilter: ProductsFilter | null = null;
    @Output() changeFilter = new EventEmitter<ProductsFilter>();

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

    ngOnChanges({brands}: SimpleChanges): void {
        if (brands) {
            this.updateBrandsControl();
        }
    }

    ngOnInit() {
        this.emitChangeFilter();
        this.setInitialFormValue();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateBrandsControl() {
        const savedBrands = this.initialFilter?.brands || [];

        const brandsControls: boolean[] = this.brands
            ? this.brands.map(brand => savedBrands.includes(brand))
            : [];

        const brandsFormArray = this.formBuilder.array(brandsControls);

        this.form.setControl('brands', brandsFormArray);
    }

    private emitChangeFilter() {
        this.form.valueChanges
            .pipe(
                map(formValue => ({
                    ...formValue,
                    brands: this.getSelectedBrands(formValue.brands as boolean[]),
                })),
                debounceTime(300),
                takeUntil(this.destroy$),
            )
            .subscribe(filter => {
                this.changeFilter.emit(filter as ProductsFilter);
            });
    }

    private getSelectedBrands(brandSelection: boolean[]): string[] {
        return this.brands ? this.brands.filter((_brand, index) => brandSelection[index]) : [];
    }

    private setInitialFormValue() {
        const {name, priceRange} = this.initialFilter || {};

        this.form.patchValue({name, priceRange});
    }
}
