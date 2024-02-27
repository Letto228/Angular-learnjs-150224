import {Component} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    isProductBoughtParent = false;
    readonly product = productsMock[5];

    buyProduct(product: Product) {
        this.isProductBoughtParent = !this.isProductBoughtParent;
        // eslint-disable-next-line no-console
        console.log('Product id:', product._id);
    }

    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }
}
