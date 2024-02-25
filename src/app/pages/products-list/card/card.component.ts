import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    protected readonly productMock = productMock;

    clickBuy(_id: string) {
        // eslint-disable-next-line no-console
        console.log('Кнопка купить нажата для товара с id:', _id);
    }
}
