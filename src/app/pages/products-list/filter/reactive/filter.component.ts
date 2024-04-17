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
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {first, tap} from 'rxjs';
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

    private readonly initialFilterValue: ProductsFilter = {
        name: '',
        brands: [],
        priceRange: {
            min: 0,
            max: 999999,
        },
    };

    private readonly formBuilder = inject(FormBuilder);

    readonly form = this.formBuilder.nonNullable.group({
        name: this.initialFilterValue.name,
        brands: this.formBuilder.array<FormControl<boolean | null>>([]),
        priceRange: this.formBuilder.nonNullable.group({
            min: this.initialFilterValue.priceRange.min,
            max: this.initialFilterValue.priceRange.max,
        }),
    });

    constructor(private readonly activeRoute: ActivatedRoute) {
        this.activeRoute.queryParamMap
            .pipe(
                first(),
                tap(paramMap => {
                    if (paramMap.get('brands')) {
                        const brands = paramMap.get('brands') as string;

                        this.initialFilterValue.brands = brands.split(',');
                    }

                    if (paramMap.get('name')) {
                        const name = paramMap.get('name') as string;

                        this.form.controls.name.setValue(name);
                    }

                    if (paramMap.get('minPrice')) {
                        const minPrice = Number(paramMap.get('minPrice')) as number;

                        this.form.controls.priceRange.patchValue({min: minPrice});
                    }

                    if (paramMap.get('maxPrice')) {
                        const maxPrice = Number(paramMap.get('maxPrice')) as number;

                        this.form.controls.priceRange.patchValue({max: maxPrice});
                    }
                }),
            )
            .subscribe();
    }

    ngOnChanges({brands}: SimpleChanges): void {
        if (brands) {
            this.updateBrandsControl();
        }
    }

    ngOnInit() {
        this.form.valueChanges.subscribe(filterValue => {
            this.changeFilter.emit({
                name: filterValue.name ? filterValue.name : '',
                brands: this.getActiveBrands(filterValue.brands),
                priceRange: {
                    min: filterValue.priceRange?.min ? filterValue.priceRange?.min : 0,
                    max: filterValue.priceRange?.max ? filterValue.priceRange?.max : 999999,
                },
            });
        });
    }

    getActiveBrands(brandsControlValue: Array<boolean | null> | undefined): string[] {
        if (brandsControlValue && this.brands) {
            return this.brands.filter((_brand, index) => brandsControlValue[index]);
        }

        return [];
    }

    private updateBrandsControl() {
        const activeBrands = this.initialFilterValue.brands.join();
        const brandsControls = this.brands?.length
            ? this.brands.map(brand => {
                  const initialValue = activeBrands.includes(brand);

                  return new FormControl(initialValue);
              })
            : [];

        const brandsFormArray = new FormArray(brandsControls);

        this.form.setControl('brands', brandsFormArray);
    }

    // private getSelectedBrands(brandsSelection: Array<boolean | null> | undefined): string[] {
    //     return brandsSelection && this.brands?.length
    //         ? this.brands.filter((_name, index) => brandsSelection[index])
    //         : [];
    // }
}
