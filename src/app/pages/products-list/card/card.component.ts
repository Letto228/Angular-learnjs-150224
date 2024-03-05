import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    readonly productCard = productMock;

    buyProduct(productId: number | string): void {
        // eslint-disable-next-line no-console
        console.log('product ID', productId);
    }

    buyFavorite(productId: number | string): void {
        // eslint-disable-next-line no-console
        console.log('product  ID to favorite', productId);
    }
}
