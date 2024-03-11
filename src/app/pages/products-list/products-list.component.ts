import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoadDirection} from '../../shared/scroll-with-loading/scroll-with-loading.directive';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    products: Product[] | null = null;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        setTimeout(() => {
            this.products = productsMock;

            this.changeDetectorRef.markForCheck();
        }, 3000);

        setTimeout(() => {
            this.products = productsMock.map(product => ({...product, rating: 5}));

            this.changeDetectorRef.markForCheck();
        }, 6000);
    }

    onProductBuy(id: Product['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    onLoad(direction: LoadDirection) {
        if (direction === 0) {
            // eslint-disable-next-line no-console
            console.log('Loading top data...');
        } else if (direction === 1) {
            // eslint-disable-next-line no-console
            console.log('Loading bottom data...');
        }
    }
}
