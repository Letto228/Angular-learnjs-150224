import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    inject,
} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {ProductsFilter} from '../products-filter.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges {
    @Input() brands: string[] | null = null;

    @Output() changeFilter = new EventEmitter<ProductsFilter>();

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

    private updateBrandsControl() {
        const brandsControls = this.brands?.length
            ? this.brands.map(() => new FormControl(false))
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
