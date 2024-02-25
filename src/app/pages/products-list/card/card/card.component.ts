import {Component} from '@angular/core';
import {productMock} from '../../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    product = productMock;
    console() {
        // eslint-disable-next-line no-console
        console.log('YOU CLICKED ME');
    }
}
