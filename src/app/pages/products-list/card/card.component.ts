import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';
// import {productsMock} from '../../../shared/products/products.mock';

// const user: User = {

// }

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() productCard: Product | null = null;
    @Output() productBuy = new EventEmitter<string | undefined>();
    // user: {name: string} = {name: 'Alex'};
    // user = user;

    // constructor() {
    //     this.user = null;
    // }

    onProductBuy(event: Event) {
        event.stopPropagation();

        // eslint-disable-next-line no-console
        console.log('Buy product');

        this.productBuy.emit(this.productCard?._id);
    }

    isStarActive(starIndex: number): boolean {
        return this.productCard ? this.productCard.rating >= starIndex : false;
    }

    getProductImgSrc(): string {
        return this.productCard ? this.productCard.images[0].url : '';
    }
}
