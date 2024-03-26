import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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

    onLoad(scroll: string) {
        // eslint-disable-next-line no-console
        console.log('Scroll to', scroll);
    }
}
