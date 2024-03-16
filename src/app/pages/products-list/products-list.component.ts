import {ChangeDetectionStrategy, Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';
import {InfiniteScrollDirection} from '../../shared/infinite-scroll/infinite-scroll-direction.enum';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly cardListLoadQuantity = 2;
    protected cardListLength = 10;
    readonly cardListMaxLength = productsMock.length;
    protected get products() {
        return productsMock.slice(0, this.cardListLength);
    }

    onProductBuy(id: Product['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    onLoadData(direction: InfiniteScrollDirection): void {
        if (direction === 'BOTTOM') {
            this.cardListLength =
                this.cardListLength + this.cardListLoadQuantity > this.cardListMaxLength
                    ? this.cardListMaxLength
                    : this.cardListLength + this.cardListLoadQuantity;
        } else if (direction === 'TOP') {
            // eslint-disable-next-line no-console
            console.log(direction);
        }
    }
}
