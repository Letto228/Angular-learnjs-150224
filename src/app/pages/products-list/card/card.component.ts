import {Component} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    cardInfo: IProduct = productMock;
    cardPreview: string = this.cardInfo.images[0].url;

    clickCallback(): void {
        // eslint-disable-next-line no-console
        console.log('Bought!');
    }
}
