import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';

// const user: User = {

// }

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    // readonly product = productsMock[0];
    // user: {name: string} = {name: 'Alex'};
    // user = user;

    // constructor() {
    //     this.user = null;
    // }

    @Input() product: Product | null = null;

    @Output() bayProduct = new EventEmitter<Product['_id']>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (this.product?._id) {
            this.bayProduct.emit(this.product._id);
        }

        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        return !!this.product && this.product.rating >= starIndex;
    }
}
