import {map, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {productsMock} from './products.mock';
import {Product} from './product.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductsApiService {
    getProducts$(): Observable<Product[]> {
        return of({data: {items: productsMock}}).pipe(map(({data}) => data.items));
    }
}
