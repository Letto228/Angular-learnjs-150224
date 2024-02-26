import {Component} from '@angular/core';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    productInfo = productMock;
    promoProduct!: string;
    productPrice!: number;

    constructor() {
        this.promoProduct = this.productInfo.images[0].url;
        this.productPrice = this.productInfo.price;
    }

    shopItem() {
        // eslint-disable-next-line no-console
        // console.log('Товар добавлен в корзину');
    }
}
