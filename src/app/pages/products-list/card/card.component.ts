import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input()
    product?: Product;

    @Input()
    isProductBought = false;

    @Output()
    readonly isProductBoughtChange = new EventEmitter<boolean>();

    buyProduct() {
        this.isProductBoughtChange.emit(!this.isProductBought);
    }

    isStarActive(starIndex: number): boolean {
        return this.product!.rating >= starIndex;
    }
}
