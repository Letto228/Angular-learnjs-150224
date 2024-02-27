import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product?: Product | null;
    isProductBought = false;

    @Output() readonly productBought = new EventEmitter<Product>();

    onProductBuy(event: Event) {
        this.isProductBought = !this.isProductBought;

        if (this.product) {
            this.productBought.emit(this.product);
        }

        event.stopPropagation();
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product!.rating >= starIndex : false;
    }
}
