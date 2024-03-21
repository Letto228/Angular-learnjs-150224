export interface IPaginationCotext<T> {
    $implicit: T[];
    appPaginationOf: T[];
    appPaginationChankSize: number;
    pageNumbers: number[];
    pageCount: number;
    index: number;
    next: () => void;
    back: () => void;
    selectIndex: (index: number) => void;
}
