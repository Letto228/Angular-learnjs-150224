import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly products: IProduct[] = productsMock;
    readonly productsInFavorite: string[] = [];
    productToCart(id: string) {
        const product: IProduct = this.products.filter((p: IProduct) => p._id === id)[0];

        // eslint-disable-next-line no-console
        console.log('Product to cart: ', product._id);
    }

    getFavoriteProduct(id: string): void {
        const index = this.productsInFavorite.findIndex(favoriteId => favoriteId === id);
        const productIndex: number = this.products.findIndex(product => product._id === id);

        if (index === -1) {
            this.productsInFavorite.push(this.products[productIndex]._id);

            // eslint-disable-next-line no-console
            console.log('My favorite products: ', this.productsInFavorite);

            return;
        }

        this.productsInFavorite.splice(index, 1);
    }
}
