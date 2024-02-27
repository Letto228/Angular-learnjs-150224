/* eslint-disable no-console */
import {Component} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';
import {productsMock} from 'src/app/shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly productParent = productsMock[1];

    onProductsListBuy(product: Product | string) {
        // eslint-disable-next-line no-console
        typeof product !== 'string'
            ? console.log('added to cart:', product)
            : console.log('removed from cart by id:', product);
    }

    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }
}
