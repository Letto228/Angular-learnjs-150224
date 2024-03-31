export interface PaginationContext<T> {
    $implicit: T[];
    pageIndexes: number[];
    appPaginationOf: T[];
    activeIndex: number;
    next: () => void;
    back: () => void;
    selectIndex: (index: number) => void;
}
