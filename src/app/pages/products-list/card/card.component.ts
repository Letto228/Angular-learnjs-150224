import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: Product | null = null;
    @Output() productIsBuy = new EventEmitter<string>();

    onProductBuy(event: Event) {
        event.stopPropagation();
        this.productIsBuy.emit(this.product?._id);
    }

    isStarActive(starIndex: number): boolean {
        if (!this.product) {
            return false;
        }

        return this.product.rating >= starIndex;
    }
}
