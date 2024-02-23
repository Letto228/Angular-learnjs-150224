import {Component} from '@angular/core';
import {productMock} from '../../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    cardName = productMock.name;
    cardRating = productMock.rating;
    cardFeedbacksCount = productMock.feedbacksCount;
    cardPrice = productMock.price;
    firstCardImage = productMock.images[0].url;
    // eslint-disable-next-line no-console
    console = () => console.log('YOU CLICKED ME');
}
