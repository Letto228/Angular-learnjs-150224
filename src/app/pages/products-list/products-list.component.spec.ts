import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {firstValueFrom, of} from 'rxjs';
import {MemoizedSelector} from '@ngrx/store';
import {ProductsListComponent} from './products-list.component';
import {ProductsListModule} from './products-list.module';
import {BrandsService} from '../../shared/brands/brands.service';
import {State} from '../../store/reducer';
import {productsSelector} from '../../store/products/products.selectors';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';
import {loadProducts} from '../../store/products/products.actions';

describe('ProductsListComponent', () => {
    let component: ProductsListComponent;
    let fixture: ComponentFixture<ProductsListComponent>;
    let mockStore: MockStore<State>;
    let dispatchSpy: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            // declarations: [ProductsListComponent],
            imports: [ProductsListModule, RouterTestingModule, BrowserAnimationsModule],
            providers: [
                provideMockStore(),
                {
                    provide: BrandsService,
                    useValue: {
                        brands$: of([]),
                        loadBrands(_subCategoryId: string | null) {},
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        mockStore = TestBed.inject(MockStore);

        mockStore.overrideSelector(
            productsSelector as MemoizedSelector<State, Product[]>,
            productsMock,
        );

        dispatchSpy = spyOn(mockStore, 'dispatch');

        fixture = TestBed.createComponent(ProductsListComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('Загрузка продуктов', async () => {
        expect(dispatchSpy).toHaveBeenCalledWith(loadProducts(null));

        const products = await firstValueFrom(component.products$);

        expect(products).toEqual(productsMock);
    });

    // it('Загрузка продуктов', done => {
    //     expect(dispatchSpy).toHaveBeenCalledWith(loadProducts(null));

    //     component.products$.pipe(take(1)).subscribe(value => {
    //         expect(value).toEqual(productsMock);

    //         done();
    //     });
    // });
});
