import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: Product | null = null;

    @Output() clickProductBuy = new EventEmitter<Product['_id']>();

    productBuy(event: Event) {
        event.stopPropagation();

        if (!this.product) {
            return;
        }

        this.clickProductBuy.emit(this.product._id);
    }

    isStarActive(starIndex: number): boolean {
        return !!this.product && this.product.rating >= starIndex;
    }
}
