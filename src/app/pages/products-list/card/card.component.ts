import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: Product | null;

    @Output() productPurchased = new EventEmitter<Product | string>();

    isProductPurchased = false;

    onProductBuy(event: Event) {
        event.stopPropagation();
        this.isProductPurchased = !this.isProductPurchased;

        if (this.product !== null) {
            this.isProductPurchased
                ? this.productPurchased.emit(this.product)
                : this.productPurchased.emit(this.product._id);
        }
    }

    isStarActive(starIndex: number): boolean {
        return this.product === null ? false : this.product.rating >= starIndex;
    }
}
