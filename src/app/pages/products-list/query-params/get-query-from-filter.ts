import {ProductsFilter} from '../filter/products-filter.interface';
import {ProductsFilterQueryParams} from './products-filter-query-params.interface';

export function getQueryFromFilter({
    name,
    brands,
    priceRange,
}: ProductsFilter): ProductsFilterQueryParams {
    return {
        name: name || undefined,
        brands: brands.length ? brands.join(',') : undefined,
        min: priceRange.min.toString(),
        max: priceRange.max.toString(),
    };
}
