import {ProductsFilter} from '../filter/products-filter.interface';
import {ProductsFilterQueryParams} from './products-filter-query-params.interface';

export function getFilterFromQuery({
    name,
    brands,
    min,
    max,
}: ProductsFilterQueryParams): ProductsFilter {
    return {
        name: name || '',
        brands: brands ? brands.split(',') : [],
        priceRange: {
            min: Number(min) || 0,
            max: Number(max) || 999999,
        },
    };
}
