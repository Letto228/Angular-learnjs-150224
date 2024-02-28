import {Injectable} from '@angular/core'
import {Observable, of} from 'rxjs'
import {IProduct} from '../../shared/interfaces/products/product.interface'
import {productsMock} from './products.mock'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): Observable<IProduct[]> {
    return of(productsMock)
  }
}
