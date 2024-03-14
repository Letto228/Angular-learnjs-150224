export interface PaginationInterface<T> {
    $implicit: T;
    chankSize: number;
    pageIndexes: number;
    activeIndex: number;
    next: () => void;
    back: () => void;
    selectIndex: (index: number) => void;
}
