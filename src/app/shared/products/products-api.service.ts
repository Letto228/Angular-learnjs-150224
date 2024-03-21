import {catchError, map, Observable, of, retry} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product.interface';
import {ProductsDto} from './products.dto';
import {BASE_URL_TOKEN} from '../base-url/base-url.token';
import {ProductDto} from './product.dto';

@Injectable({
    providedIn: 'root',
})
export class ProductsApiService {
    constructor(
        private readonly httpClient: HttpClient,
        @Inject(BASE_URL_TOKEN) private readonly baseUrl: string,
    ) {}

    getProducts$(): Observable<Product[]> {
        // return of({data: {items: productsMock}}).pipe(map(({data}) => data.items));
        return this.httpClient.get<ProductsDto>(`/products`).pipe(
            map(({data}) => data.items),
            retry({count: 2, delay: 1000}),
            catchError(() => of([])),
        );
    }

    getProduct$(id: Product['_id']): Observable<Product | undefined> {
        return this.httpClient.get<ProductDto>(`/products/${id}`).pipe(
            map(({data}) => data),
            retry({count: 2, delay: 1000}),
            catchError(() => of(undefined)),
        );
    }
}
