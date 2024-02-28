import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    readonly product = productMock;

    onCardClick(): void {
        // console.log('on card click!');
    }

    onBuyClick(event: MouseEvent): void {
        event.stopPropagation();
        // console.log('on buy button click!');
    }
}
