import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: Product | null = null;
    @Output() buyClick = new EventEmitter<Product | null>();

    onProductBuy(event: Event, product: Product | null) {
        event.stopPropagation();
        this.buyClick.emit(product);
    }

    productImage(): string {
        return this.product?.images[0]?.url || '';
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product?.rating >= starIndex : false;
    }
}
