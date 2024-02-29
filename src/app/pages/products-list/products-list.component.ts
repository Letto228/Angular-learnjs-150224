import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly products = productsMock;

    onBuyClick(product: Product | null) {
        // eslint-disable-next-line no-console
        console.log('on buy click in products list', product);
    }

    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }
}
