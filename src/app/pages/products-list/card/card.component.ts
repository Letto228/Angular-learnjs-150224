import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: Product | null = null;

    @Output() productBuy = new EventEmitter<string>();

    getProductImage(): string {
        if (this.product?.images.length) {
            return this.product.images[0].url;
        }

        return '';
    }

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (this.product) {
            this.productBuy.emit(this.product._id);
        }
    }

    isStarActive(starIndex: number): boolean {
        return !!this.product && this.product.rating >= starIndex;
    }
}
