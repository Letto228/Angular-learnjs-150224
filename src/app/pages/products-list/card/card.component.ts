import {Component, Input} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';
import {productsMock} from '../../../shared/products/products.mock';

// const user: User = {

// }

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: Product = productsMock[0];
    // user: {name: string} = {name: 'Alex'};
    // user = user;

    // constructor() {
    //     this.user = null;
    // }

    onProductBuy(event: Event) {
        event.stopPropagation();

        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        return this.product.rating >= starIndex;
    }
}
