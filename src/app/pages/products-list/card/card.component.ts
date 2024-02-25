import {Component} from '@angular/core';
import {productMock} from 'src/app/shared/products/product.mock';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    product: IProduct = productMock;

    addToCart(event: Event) {
        event.stopPropagation();
        console.log('Order');
    }
}
