import {Component} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';
import {productsMock} from 'src/app/shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly products = productsMock;

    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }

    addToBasket(event: Product['_id'] | undefined) {
        // eslint-disable-next-line no-console
        console.log('Buy', event);
    }

    getProduct(): Product {
        // return this.products[Math.floor(Math.random() * (8 - 1 + 1) + 1)];
        return this.products[2];
    }
}
