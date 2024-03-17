export interface IPaginationCotext<T> {
    $implicit: T[];
    appPaginationOf: T[];
    appPaginationChankSize: number;
    appPaginationCount: number[];
    pageIndexes: number;
    index: number;
    next: () => void;
    back: () => void;
    selectIndex: (index: number) => void;
}
