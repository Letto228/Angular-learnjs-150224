import {Component} from '@angular/core'
import {product} from '../../../services/products/product.mock'

@Component({
  selector: 'app-product-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  readonly productCard = product

  buyProduct(productId: number | string): void {
    console.log('product ID', productId)
  }

  buyFavorite(productId: number | string): void {
    console.log('product  ID to favorite', productId)
  }
}
