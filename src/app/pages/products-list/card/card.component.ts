import {Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';
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
    @Input() goodsInBasket: string[] = [''];
    basket: string[] = this.goodsInBasket;
    @Output() readonly goodsInBasketChange = new Subject<string[]>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (this.basket[0] === '') {
            this.basket.pop();
        }

        this.basket.push(this.product._id);
        this.goodsInBasketChange.next(this.basket);
        // eslint-disable-next-line no-console
        console.log(`Buy product id: ${this.product._id}`);
    }

    isStarActive(starIndex: number): boolean {
        return this.product.rating >= starIndex;
    }
}
