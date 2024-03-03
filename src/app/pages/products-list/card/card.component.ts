import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input()
    product: Product | null = null;

    @Output()
    readonly isProductBoughtChange = new EventEmitter<string>();

    buyProduct(event: Event) {
        event.stopPropagation();

        if (this.product) {
            const {_id: id} = this.product;

            this.isProductBoughtChange.emit(id);
        }
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product.rating >= starIndex : false;
    }
}
