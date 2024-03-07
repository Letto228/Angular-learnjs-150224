import {Component} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';
import {productsMock} from 'src/app/shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly productParent = productsMock;

    bayProductItem(id: Product['_id']) {
        // eslint-disable-next-line no-console
        console.log(`Buy product${id}`);
    }

    // onCardClick() {
    //     // eslint-disable-next-line no-console
    //     console.log('Card click');
    // }
}
