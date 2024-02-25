import {Component} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    product: IProduct = productMock;

    getPriceProduct(price: number): string {
        return price ? `$${price}` : '-';
    }

    onClickBuy(e: MouseEvent, id: string) {
        e.stopPropagation();
        // eslint-disable-next-line
        console.log(id);
    }
}
