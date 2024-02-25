import {Component} from '@angular/core';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    imageUrl = productMock.images[0].url;
    price = productMock.price;
    rating = productMock.rating;
    name = productMock.name;
    buy() {}
}
