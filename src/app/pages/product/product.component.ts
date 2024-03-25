import {ChangeDetectionStrategy, Component} from '@angular/core';
import {filter, map, switchMap, tap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    // readonly product$ = of('portativnaa-kolonka-huawei-cm510-cernyj').pipe(
    // readonly product$ = this.activatedRoute.paramMap.pipe(
    //     map(paramMap => paramMap.get('productId')),
    //     filter(Boolean),
    readonly product$ = this.activatedRoute.params.pipe(
        // map(({productId}) => productId),
        // eslint-disable-next-line dot-notation
        map(params => params['productId']),
        filter(Boolean),
        tap(productId => {
            this.productsStoreService.loadProduct(productId);
        }),
        switchMap(() => this.productsStoreService.currentProduct$),
    );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) {
        // eslint-disable-next-line no-console
        this.activatedRoute.queryParamMap.subscribe(console.log);
    }

    onTypeNavigate() {
        // this.router.navigate(['./type'], {relativeTo: this.activatedRoute});

        const urlTree = this.router.createUrlTree(['./type'], {
            relativeTo: this.activatedRoute,
            queryParams: {
                name: 'Egor',
                price: 100,
            },
            queryParamsHandling: 'merge',
        });

        // eslint-disable-next-line no-console
        console.log(urlTree.toString());

        this.router.navigateByUrl(urlTree);
    }
}
