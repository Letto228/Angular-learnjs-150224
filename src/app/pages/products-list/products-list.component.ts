import {Component} from '@angular/core';
import {Product} from '../../shared/products/product.interface';
import {productsMock} from '../../shared/products/products.mock';

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

    addToCart(id: Product['_id'] | undefined) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    // вообще я не планировала эту аццкую покупалку (что оно по клику все будет обновляться), но по приколу оставлю, добавил в корзину товар - ну и нечего на него больше смотреть, вот тебе другой :D
    chooseRandomProduct(): Product {
        const randomProduct: number =
            Math.floor(Math.random() * (productsMock.length - 1 - 0 + 1)) + 0;

        return productsMock[randomProduct];
    }
}
