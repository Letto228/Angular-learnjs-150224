import {Component} from '@angular/core'
import {IProduct} from '../../shared/interfaces/products/product.interface'
import {ProductService} from '../../services/products/product.service'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  products: IProduct[] = []
  currentProduct!: IProduct
  productsInCart: IProduct[] = []
  productsInFavorite: IProduct[] = []

  constructor(private productsServices: ProductService) {
    this.productsServices.getProducts().subscribe((result) => {
      this.products = result
      this.currentProduct = this.products[1]

      console.log(this.currentProduct)
    })
  }

  productToCart(id: string) {
    const product: IProduct = this.products.filter(
      (p: IProduct) => p._id === id
    )[0]
    console.log('Product to cart: ', product._id)
  }

  getFavoriteProduct(id: string): void {
    console.log(id)
    const index = this.productsInFavorite
      .map((p: IProduct) => p._id)
      .indexOf(id)

    if (index === -1) {
      this.productsInFavorite.push(
        this.products.filter((p: IProduct) => p._id === id)[0]
      )
    } else {
      this.productsInFavorite.splice(index, 1)
    }
    console.log('My favorite products: ', this.productsInFavorite)
  }
}
