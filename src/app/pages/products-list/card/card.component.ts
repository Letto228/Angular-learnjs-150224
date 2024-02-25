import {Component} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    product: IProduct = productMock;

    order(e: Event): void {
        e.stopPropagation();
        // eslint-disable-next-line
        console.log('order');
    }
}
