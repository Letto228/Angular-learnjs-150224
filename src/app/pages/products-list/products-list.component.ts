import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }

    buyProduct(id: string): void {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    protected readonly products: Product[] = productsMock;
}
