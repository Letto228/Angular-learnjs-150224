import {catchError, map, Observable, of, retry} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product.interface';
import {ProductsDto} from './products.dto';
import {ProductDto} from './product.dto';
import {getParamsFromObject} from '../params/get-params-from-object';

@Injectable({
    providedIn: 'root',
})
export class ProductsApiService {
    constructor(private readonly httpClient: HttpClient) {}

    getProducts$(subCategoryId?: Product['_id'] | null): Observable<Product[]> {
        return this.httpClient
            .get<ProductsDto>(`/products`, {params: getParamsFromObject({subCat: subCategoryId})})
            .pipe(
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
