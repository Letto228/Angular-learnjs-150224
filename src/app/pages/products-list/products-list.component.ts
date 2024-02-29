import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';

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

    onProductBuy(event: string) {
        // eslint-disable-next-line no-console
        console.log('Buy product', event);
    }
}
