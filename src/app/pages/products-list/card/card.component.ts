import {Component} from '@angular/core';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    card = productMock;

    buy(): void {
        // eslint-disable-next-line no-console
        console.log('Buy product');
    }
}
