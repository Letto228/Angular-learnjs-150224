import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    isProductBought = false;

    changeProductStatus() {
        this.isProductBought = !this.isProductBought;
        // eslint-disable-next-line no-console
        console.log(this.isProductBought);
    }

    readonly product = productsMock[0];

    buyProduct() {
        this.changeProductStatus();
    }

    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('Card click');
    }
}
