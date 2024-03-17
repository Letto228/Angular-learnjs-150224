import {Product} from 'src/app/shared/products/product.interface';

export interface PaginationContext {
    $implicit: Product[];
    appPaginationOf: Product[];
    pageIndexes: number;
    pageIndexesArray: number[];
    page: number;
    shouldShowPagination: boolean;
    next: () => void;
    back: () => void;
    go: (pageIndex: number) => void;
}
