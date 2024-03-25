export interface PaginationContext<T> {
    $implicit: T[];
    appPaginationOf: T[];
    pageIndexes: number[];
    activeIndex: number;
    next: () => void;
    back: () => void;
    selectIndex: (pageIndex: number) => void;
    shouldShowPagination: boolean;
}
