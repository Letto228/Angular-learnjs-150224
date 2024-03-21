import {Pipe, PipeTransform} from '@angular/core';
import {Product} from 'src/app/shared/products/product.interface';

@Pipe({
    name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
    transform(products: Product[], searchName: string): Product[] {
        return products.filter(item => item.name.includes(searchName));
    }
}
