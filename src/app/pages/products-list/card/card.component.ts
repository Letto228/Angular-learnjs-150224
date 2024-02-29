import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: Product | null = null;
    @Input() isProductPurchased = false;

    @Output() productPurchased = new EventEmitter<string>();

    onProductBuy() {
        this.productPurchased.emit(this.product?._id);
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product.rating >= starIndex : false;
    }
}
