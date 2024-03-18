import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';
import {LoadDirection} from '../../shared/scroll-with-loading/enum/load-directions';

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

    onLoad(direction: LoadDirection): void {
        if (direction === LoadDirection.Top) {
            // eslint-disable-next-line no-console
            console.log('Load data at the top');

            return;
        }

        if (direction === LoadDirection.Bottom) {
            // eslint-disable-next-line no-console
            console.log('Load data at the bottom');
        }
    }
}
