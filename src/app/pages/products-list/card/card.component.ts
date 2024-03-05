import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: Product | null = null;
    @Output() buyProduct = new EventEmitter<string>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (this.product) {
            this.buyProduct.emit(this.product._id);
        }

        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        if (this.product) {
            return this.product.rating >= starIndex;
        }

        return false;
    }

    productImage(): string {
        return this.product?.images[0].url || '';
    }
}
