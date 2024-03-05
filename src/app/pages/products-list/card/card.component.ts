import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input({required: true}) product!: IProduct;
    @Output() itemToCart = new EventEmitter<string>();
    @Output() itemToFavorite = new EventEmitter<string>();
    currentSLide = 0;

    buyProduct(productId: string): void {
        this.itemToCart.emit(productId);
    }

    buyFavorite(productId: string): void {
        this.itemToFavorite.emit(productId);
    }

    isStarActive(starIndex: number): boolean {
        return this.product.rating >= starIndex;
    }

    nextSlide(): void {
        this.currentSLide = ++this.currentSLide % this.product.images.length;
    }

    prevSlide(): void {
        this.currentSLide = --this.currentSLide % this.product.images.length;
    }
}
