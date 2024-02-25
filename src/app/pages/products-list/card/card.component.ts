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

    logToConsole(event: MouseEvent, message?: string) {
        event.stopPropagation();
        // eslint-disable-next-line no-console
        console.log(message);
    }
}
