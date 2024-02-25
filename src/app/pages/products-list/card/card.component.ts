import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    cardInfo = productMock;

    addToCart(): void {
        // eslint-disable-next-line no-console
        console.log('Добавить в корзину...');
    }

    buyNow(): void {
        // eslint-disable-next-line no-console
        console.log('Быстрая покупка...');
    }
}
