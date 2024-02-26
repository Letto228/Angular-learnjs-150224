import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    interpolation: ['{{', '}}'],
})
export class CardComponent {
    product: IProduct = productMock;
    printInfo(): void {
        // eslint-disable-next-line no-console
        console.log(`${this.product.name} добавлен в корзину!`);
    }
}
