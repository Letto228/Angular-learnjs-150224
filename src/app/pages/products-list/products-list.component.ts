import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.productsStoreService.loadProducts(subCategoryId);
        }),
        switchMap(() => this.productsStoreService.products$),
    );
    // readonly products$ = this.activatedRoute.data.pipe(
    //     map(({productsStore}) => productsStore as Product[]),
    // );

    // readonly counterFormControl = new FormControl(5);

    counter = 3;

    onInputChange(value: number) {
        // eslint-disable-next-line no-console
        console.log(value);
    }

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {
        setTimeout(() => {
            this.counter = 9;

            this.changeDetectorRef.markForCheck();
        }, 3000);
        // console.log(this.counterFormControl.touched);

        // setTimeout(() => {
        //     console.log(this.counterFormControl.touched);
        //     this.counterFormControl.setValue(10);
        // }, 4000);

        // this.counterFormControl.valueChanges.subscribe(console.log);
    }

    onProductBuy(id: Product['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackBy(_index: number, item: Product): Product['_id'] {
        return item._id;
    }
}
