import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input({required: true}) product: IProduct | null = null;
    @Output() itemToCart = new EventEmitter<string>();
    @Output() itemToFavorite = new EventEmitter<string>();
    currentSLideIndex = 0;

    buyProduct(productId: string): void {
        this.itemToCart.emit(productId);
    }

    buyFavorite(productId: string): void {
        this.itemToFavorite.emit(productId);
    }

    isStarActive(starIndex: number): boolean {
        if (this.product && this.product.rating) {
            return this.product.rating >= starIndex;
        }

        return false;
    }

    nextSlide(): void {
        if (this.product) {
            this.currentSLideIndex = this.calculatingLoopedIndex(
                1,
                this.currentSLideIndex,
                this.product?.images.length,
            );
        }
    }

    prevSlide(): void {
        if (this.product) {
            this.currentSLideIndex = this.calculatingLoopedIndex(
                -1,
                this.currentSLideIndex,
                this.product.images.length,
            );
        }
    }

    private readonly calculatingLoopedIndex = function (
        increment: -1 | 1,
        currentIndex: number,
        arrayLength: number,
    ): number {
        const newIndex = currentIndex + increment;
        const remainderOfDivision = newIndex % arrayLength;
        const isNegativeRemainderOfDivision = remainderOfDivision < 0;

        return isNegativeRemainderOfDivision
            ? remainderOfDivision + arrayLength
            : remainderOfDivision;
    };
}
