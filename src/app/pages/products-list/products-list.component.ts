import {ChangeDetectionStrategy, Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    products = productsMock;

    onProductBuy(id: Product['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    constructor() {
        // eslint-disable-next-line no-console
        console.log('constructor - ProductsList');
    }

    ngOnInit(): void {
        // eslint-disable-next-line no-console
        console.log('ngOnInit - ProductsList');
    }

    ngDoCheck(): void {
        // eslint-disable-next-line no-console
        console.log('ngDoCheck - ProductsList');
    }

    ngAfterContentInit(): void {
        // eslint-disable-next-line no-console
        console.log('ngAfterContentInit - ProductsList');
    }

    ngAfterContentChecked(): void {
        // eslint-disable-next-line no-console
        console.log('ngAfterContentChecked - ProductsList');
    }

    ngAfterViewInit(): void {
        // eslint-disable-next-line no-console
        console.log('ngAfterViewInit - ProductsList');
    }

    // counter = 0;

    ngAfterViewChecked(): void {
        // eslint-disable-next-line no-console
        console.log('ngAfterViewChecked - ProductsList');
        // this.products = [productsMock[this.counter++]];
        // console.log(this.products);
    }

    ngOnDestroy(): void {
        // eslint-disable-next-line no-console
        console.log('ngOnDestroy - ProductsList');
    }
}
