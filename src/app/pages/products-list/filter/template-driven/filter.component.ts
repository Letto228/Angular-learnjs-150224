import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductsFilter} from '../products-filter.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
    @Input() brands: string[] | null = null;

    @Output() changeFilter = new EventEmitter<ProductsFilter>();

    onLogFormValue(formValue: {
        name: string;
        brands: Record<string, boolean>;
        priceRange: {min: number; max: number};
    }) {
        const sanitizedBrands = this.brands?.length
            ? this.brands.filter(brand => formValue.brands[brand])
            : [];

        // eslint-disable-next-line no-console
        console.log({
            ...formValue,
            brands: sanitizedBrands,
        });
    }
}
