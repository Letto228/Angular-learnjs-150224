import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs';
import {Product} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly products$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('categoryId')),
        tap(categoryId => {
            this.productsStoreService.loadProducts(categoryId);
        }),
        switchMap(() => this.productsStoreService.products$),
    );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    onProductBuy(id: Product['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackBy(_index: number, item: Product): Product['_id'] {
        return item._id;
    }
}
