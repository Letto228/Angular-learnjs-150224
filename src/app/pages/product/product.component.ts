import {ChangeDetectionStrategy, Component} from '@angular/core';
import {of, switchMap, tap} from 'rxjs';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    readonly product$ = of('portativnaa-kolonka-huawei-cm510-cernyj').pipe(
        tap(productId => {
            this.productsStoreService.loadProduct(productId);
        }),
        switchMap(() => this.productsStoreService.currentProduct$),
    );

    constructor(private readonly productsStoreService: ProductsStoreService) {}
}
