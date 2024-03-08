import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';

// const user: User = {

// }

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    // user: {name: string} = {name: 'Alex'};
    // user = user;

    // constructor() {
    //     this.user = null;
    // }
    @Input() product: Product | undefined;
    @Output() placeGoods = new EventEmitter<void>();

    onProductBuy(event: Event): void {
        event.stopPropagation();

        this.placeGoods.emit();
    }

    isStarActive(starIndex: number): boolean {
        return this.product !== undefined ? this.product.rating >= starIndex : false;
    }
}
