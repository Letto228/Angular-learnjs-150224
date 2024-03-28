import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {ProductsApiService} from '../products/products-api.service';
import {Product} from '../products/product.interface';

export const productsResolver: ResolveFn<Product[]> = ({paramMap}, _state) => {
    const subCategoryId = paramMap.get('subCategoryId');

    return inject(ProductsApiService).getProducts$(subCategoryId);
};
