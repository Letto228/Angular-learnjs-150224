import {Component, EventEmitter, Input, Output} from '@angular/core'
import {IProduct} from '../../../shared/interfaces/products/product.interface'

@Component({
  selector: 'app-product-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input({required: true}) productCard!: IProduct
  @Output() itemToCart = new EventEmitter<string>()
  @Output() itemToFavorite = new EventEmitter<string>()
  currentSLide = 0

  buyProduct(productId: string): void {
    this.itemToCart.emit(productId)
  }

  buyFavorite(productId: string): void {
    this.itemToFavorite.emit(productId)
  }

  isStarActive(starIndex: number): boolean {
    return this.productCard.rating >= starIndex
  }

  nextSlide(): void {
    this.currentSLide = ++this.currentSLide % this.productCard.images.length
  }

  prevSlide(): void {
    this.currentSLide = --this.currentSLide % this.productCard.images.length
  }
}
