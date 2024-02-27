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

    @Output()
    isBought = new EventEmitter<boolean>();

    buyProduct(event: Event) {
        event.stopPropagation();
        this.isBought.emit();
        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        return this.product!.rating >= starIndex;
    }
}
