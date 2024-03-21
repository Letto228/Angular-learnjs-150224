export interface IPaginationContext<T> {
    $implicit: T[];
    appPaginationOf: T[];
    pageIndexes: number[];
    index: number;
    next: () => void;
    back: () => void;
    selectIndex: (index: number) => void;
}
