export interface CarouselContext<T> {
    $implicit: T;
    index: number;
    appCarouselOf: T[];
    next: () => void;
    back: () => void;
}
