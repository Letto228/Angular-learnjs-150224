/* eslint-disable no-console */
import {Component} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    product: IProduct = productMock;

    logToConsole(event: any, message?: string) {
        event.stopPropagation();
        console.log(message);
    }
}
