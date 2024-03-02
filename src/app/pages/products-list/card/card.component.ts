import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: Product | null = null;

    @Output() productBuy = new EventEmitter<string | undefined>();

    getProductImage(product: Product | null): string {
        if (product && product.images.length) {
            return product.images[0].url;
        }

        return '';
    }

    onProductBuy(event: Event, id?: string) {
        event.stopPropagation();
        this.productBuy.emit(id);
    }

    isStarActive(starIndex: number): boolean {
        return !!this.product && this.product.rating >= starIndex;
    }
}
