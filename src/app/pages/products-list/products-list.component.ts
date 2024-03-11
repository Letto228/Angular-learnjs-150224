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
    private productsStore: Product[] | null = null;

    get products(): Product[] | null {
        // eslint-disable-next-line no-console
        console.log('Calculate products');

        return this.productsStore;
    }

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        setTimeout(() => {
            this.productsStore = productsMock;

            this.changeDetectorRef.markForCheck();
        }, 3000);

        setTimeout(() => {
            // this.productsStore = productsMock.map(item => ({...item, _id: item._id + 1}));
            // this.productsStore = productsMock.map(item => ({...item}));
            this.productsStore = productsMock.map(item => ({...item, feedbacksCount: 10}));
            // this.productsStore = [...productsMock];

            this.changeDetectorRef.markForCheck();
        }, 6000);
    }

    onProductBuy(id: Product['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackBy(_index: number, item: Product): Product['_id'] {
        // return item;
        // return item.name + item.price;
        return item._id;
    }
}
