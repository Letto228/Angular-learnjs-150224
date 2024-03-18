import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Product} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    // private httpSevice = new HttpSevice();
    // private readonly productsStoreService = new ProductsStoreService(
    //     this.httpSevice,
    //     new ProductsApiService(this.httpSevice)
    // );
    // private readonly productsStoreService = inject(ProductsStoreService);

    readonly products$ = this.productsStoreService.products$;

    // constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    // constructor(
    //     @Inject(ProductsStoreService) private readonly productsStoreService: ProductsStoreService,
    // ) {}
    constructor(
        private readonly productsStoreService: ProductsStoreService,
        // @Inject('UserName') userName: string,
        // @Inject('ProductsStoreService') productsStoreServiceString: ProductsStoreService,
        // @Inject('factory') factory: ProductsStoreService,
        // @Inject(ElementRef) elementRef: ElementRef<HTMLElement>,
    ) {
        // console.log(this.productsStoreService === factory);
        // this.nativeElement = elementRef.nativeElement;
    }

    // nativeElement: HTMLElement;

    ngOnInit(): void {
        this.productsStoreService.loadProducts();
        // setTimeout(() => {
        //     this.products = productsMock;

        //     this.changeDetectorRef.markForCheck();
        // }, 3000);
    }

    onProductBuy(id: Product['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackBy(_index: number, item: Product): Product['_id'] {
        return item._id;
    }
}
