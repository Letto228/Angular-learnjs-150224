/* eslint-disable no-console */
import {Component} from '@angular/core';
import {productsMock} from 'src/app/shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly productParent = productsMock[1];

    isProductPurchasedParent = false;

    onProductsListBuy(id: string) {
        // eslint-disable-next-line no-console

        console.log('product id:', id);
    }

    onCardClick() {
        this.isProductPurchasedParent = !this.isProductPurchasedParent;
    }
}
