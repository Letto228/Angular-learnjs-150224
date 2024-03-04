import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product!: Product;
    @Output() choisenProduct = new EventEmitter<Product>();

    onProductBuy(event: Event) {
        event.stopPropagation();
        this.choisenProduct.emit(this.product);
    }

    isStarActive(starIndex: number): boolean {
        return this.product.rating >= starIndex;
    }
}
