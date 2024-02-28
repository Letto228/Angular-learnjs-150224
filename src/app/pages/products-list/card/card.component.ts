import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';
// import {productsMock} from '../../../shared/products/products.mock';

// const user: User = {

// }

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: Product | null = null;
    @Output() buyClick = new EventEmitter<MouseEvent>();
    // user: {name: string} = {name: 'Alex'};
    // user = user;

    // constructor() {
    //     this.user = null;
    // }

    onProductBuy(event: MouseEvent) {
        event.stopPropagation();
        this.buyClick.emit(event);

        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    // isStarActive(starIndex: number): boolean {
    //     return this.product?.rating >= starIndex;
    // }
}
