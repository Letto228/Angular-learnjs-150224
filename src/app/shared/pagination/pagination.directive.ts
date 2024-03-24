import {
    Directive,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject, filter, map, Subject, takeUntil} from 'rxjs';
import {chunk} from 'lodash';
import {PaginationInterface} from './pagination.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | null | undefined;
    @Input() appPaginationChunkSize = 4;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    private groupedItems: T[][] = [];

    private get shouldShowPagination(): boolean {
        return !!this.appPaginationOf?.length;
    }

    constructor(
        private readonly templateRef: TemplateRef<PaginationInterface<T>>,
        private readonly viewContainerRef: ViewContainerRef,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChunkSize}: SimpleChanges): void {
        if (appPaginationOf || appPaginationChunkSize) {
            this.updateView();
        }
    }

    ngOnInit(): void {
        this.listenCurrentIndex();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    @HostListener('window:keydown.arrowRight', ['$event'])
    onNextPage() {
        this.next();
    }

    @HostListener('window:keydown.arrowLeft', ['$event'])
    onPrevPage() {
        this.back();
    }

    private updateView() {
        if (!this.shouldShowPagination) {
            this.viewContainerRef.clear();

            return;
        }

        this.groupedItems = chunk(this.appPaginationOf, this.appPaginationChunkSize);
        this.currentIndex$.next(0);
    }

    private listenCurrentIndex() {
        this.currentIndex$
            .pipe(
                filter(() => this.shouldShowPagination),
                map(currentIndex => this.getCurrentContext(currentIndex)),
                takeUntil(this.destroy$),
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(currentIndex: number): PaginationInterface<T> {
        return {
            index: currentIndex,
            $implicit: this.groupedItems[currentIndex],
            pageIndexes: this.groupedItems.map((group, index) => index),
            appPaginationOf: this.appPaginationOf as T[],
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            selectIndex: (index: number) => {
                this.selectIndex(index);
            },
        };
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.groupedItems.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        const lastIndex = this.groupedItems.length - 1;
        const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

        this.currentIndex$.next(newIndex);
    }

    private selectIndex(index: number): void {
        this.currentIndex$.next(index);
    }
}
