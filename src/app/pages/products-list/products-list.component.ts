import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    products: IProduct[] = productsMock;
    productsInFavorite: IProduct[] = [];
    productToCart(id: string) {
        const product: IProduct = this.products.filter((p: IProduct) => p._id === id)[0];

        // eslint-disable-next-line no-console
        console.log('Product to cart: ', product._id);
    }

    getFavoriteProduct(id: string): void {
        // eslint-disable-next-line no-console
        console.log(id);
        const index = this.productsInFavorite.map((p: IProduct) => p._id).indexOf(id);

        if (index === -1) {
            this.productsInFavorite.push(this.products.filter((p: IProduct) => p._id === id)[0]);
        } else {
            this.productsInFavorite.splice(index, 1);
        }

        // eslint-disable-next-line no-console
        console.log('My favorite products: ', this.productsInFavorite);
    }
}
