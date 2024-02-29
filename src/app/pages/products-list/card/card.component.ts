import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: Product | null = null;

    @Output() readonly buy = new EventEmitter<Product['_id']>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (!this.product) {
            return;
        }

        this.buy.emit(this.product._id);
    }

    isStarActive(starIndex: number): boolean {
        return !!this.product && this.product.rating >= starIndex;
    }
}
