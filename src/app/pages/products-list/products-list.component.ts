import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly product = productsMock[0];
    goodsInBasket: string[] = [];
    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }

    onCardBuyClick(id: string) {
        // eslint-disable-next-line no-console
        console.log(`Buy click click in ProductList`);
        // eslint-disable-next-line no-console
        this.goodsInBasket.push(id);
        // eslint-disable-next-line no-console
        console.log(this.goodsInBasket);
    }
}
