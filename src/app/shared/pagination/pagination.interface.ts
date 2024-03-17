export interface PaginationInterface<T> {
    $implicit: T[];
    pageIndex: number;
    appPaginationOf: T[][];
    next: () => void;
    back: () => void;
}
