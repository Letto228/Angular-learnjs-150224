import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';

// const user: User = {

// }

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product!: Product | null;
    @Output() buyProduct = new EventEmitter<Product>();

    // readonly product = productsMock[0];

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (this.product) {
            this.buyProduct.emit(this.product);
        }

        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        return (
            this.product !== null && this.product !== undefined && this.product.rating >= starIndex
        );
    }
}
