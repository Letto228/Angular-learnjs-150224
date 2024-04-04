import {TestBed} from '@angular/core/testing';

import {take} from 'rxjs';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ProductsApiService} from './products-api.service';
import {productsMock} from './products.mock';

// const httpClient: HttpClient = {
//     get(_url: string, ..._args: unknown[]) {},
// } as HttpClient;

describe('ProductsApiService', () => {
    let service: ProductsApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            // providers: [
            //     {
            //         provide: HttpClient,
            //         useValue: httpClient,
            //     },
            // ],
        });

        service = TestBed.inject(ProductsApiService);
        httpMock = TestBed.inject(HttpTestingController);

        // spyOn(httpClient, 'get').and.returnValue(of({data: {items: productsMock}}));
    });

    it('Загрузка продуктов', done => {
        service
            .getProducts$()
            .pipe(take(1))
            .subscribe(products => {
                expect(products).toEqual(productsMock);

                done();
            });

        httpMock.expectOne('/products').flush({data: {items: productsMock}});
    });
});
