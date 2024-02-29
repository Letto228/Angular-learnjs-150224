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
    readonly productsCart: Product[] = [];

    addInCart(event: string): void {
        const product = this.products.find(product => product._id === event);

        if (product) {
            this.productsCart.push(product);
        }
    }

    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }
}
