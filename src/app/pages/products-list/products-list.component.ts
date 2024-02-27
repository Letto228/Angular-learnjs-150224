import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    isProductBoughtParent = false;

    readonly product = productsMock[0];

    buyProduct() {
        this.isProductBoughtParent = !this.isProductBoughtParent;
    }

    onCardClick() {
        this.buyProduct();
    }
}
