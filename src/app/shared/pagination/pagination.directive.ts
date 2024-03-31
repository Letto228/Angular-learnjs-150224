import {
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject, Subject, filter, map, takeUntil} from 'rxjs';
import {PaginationContext} from './pagination.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | null | undefined;
    @Input() chunkSize = 4;

    private readonly currentPage$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    private chunkProducts: T[][] = [];

    constructor(
        private readonly templateRef: TemplateRef<PaginationContext<T>>,
        private readonly viewContainer: ViewContainerRef,
    ) {}

    get shouldShowItems(): boolean {
        return !!this.appPaginationOf && this.appPaginationOf.length > 0;
    }

    getChunk<T>(array: T[], size: number): T[][] {
        const result: T[][] = [];

        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }

        return result;
    }

    ngOnChanges({appPaginationOf, chunkSize}: SimpleChanges): void {
        if (appPaginationOf || chunkSize) {
            this.updateView();
        }
    }

    ngOnInit() {
        this.listenCurrentIndex();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView() {
        if (this.shouldShowItems) {
            this.chunkProducts = this.getChunk(this.appPaginationOf!, this.chunkSize);
            this.currentPage$.next(0);
        } else {
            this.viewContainer.clear();
        }
    }

    private listenCurrentIndex() {
        this.currentPage$
            .pipe(
                filter(() => this.shouldShowItems),
                map(currentIndex => this.getCurrentContext(currentIndex)),
                takeUntil(this.destroy$),
            )
            .subscribe(context => {
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(currentIndex: number): PaginationContext<T> {
        return {
            $implicit: this.chunkProducts[currentIndex] as T[],
            pageIndexes: Array.from(
                {length: Math.ceil(this.appPaginationOf!.length / this.chunkSize)},
                (_, i) => i,
            ),
            activeIndex: currentIndex,
            appPaginationOf: this.appPaginationOf as T[],
            next: this.next.bind(this),
            back: this.back.bind(this),
            selectIndex: this.selectIndex.bind(this),
        };
    }

    next() {
        const nextIndex =
            (this.currentPage$.value + 1) %
            Math.ceil(this.appPaginationOf!.length / this.chunkSize);

        this.currentPage$.next(nextIndex);
    }

    back() {
        const previousIndex =
            this.currentPage$.value === 0
                ? Math.floor(this.appPaginationOf!.length / this.chunkSize) - 1
                : this.currentPage$.value - 1;

        this.currentPage$.next(previousIndex);
    }

    selectIndex(index: number) {
        this.currentPage$.next(index);
    }

    static ngTemplateContextGuard<T>(
        _directive: PaginationDirective<T>,
        _context: unknown,
    ): _context is PaginationContext<T> {
        return true;
    }

    static ngTemplateGuardAppPaginationOf<T>(
        _directive: PaginationDirective<T>,
        _inputValue: T[] | undefined | null,
    ): _inputValue is T[] {
        return true;
    }
}
