/* eslint-disable no-console */
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
import {BehaviorSubject, filter, map, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {chunk} from 'lodash';
import {IPaginationContext} from './i-pagination-context';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | null | undefined;
    @Input() appPaginationChankSize = 4;

    private readonly currentPage$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();
    private groupedItems: T[][] = [];

    private get shouldShowPages(): boolean {
        return !!this.appPaginationOf?.length;
    }

    constructor(
        private readonly templateRef: TemplateRef<IPaginationContext<T>>,
        private readonly viewContainerRef: ViewContainerRef,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges): void {
        if (appPaginationOf || appPaginationChankSize) {
            this.updateView();
        }
    }

    ngOnInit() {
        this.listenCurrentPage();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView() {
        if (this.shouldShowPages) {
            this.groupedItems = chunk(this.appPaginationOf, this.appPaginationChankSize);
            this.currentPage$.next(0);

            return;
        }

        this.viewContainerRef.clear();
    }

    private listenCurrentPage() {
        this.currentPage$
            .pipe(
                filter(() => this.shouldShowPages),
                map((page: number) => this.getCurrentContext(page)),
                takeUntil(this.destroy$),
            )
            .subscribe(context =>
                this.viewContainerRef.createEmbeddedView(this.templateRef, context),
            );
    }

    private getCurrentContext(currentPageIndex: number): IPaginationContext<T> {
        return {
            next: () => this.next(),
            back: () => this.back(),
            selectIndex: (index: number) => this.selectIndex(index),

            $implicit: this.groupedItems[currentPageIndex],
            activeIndex: currentPageIndex,
            pageIndexes: this.groupedItems.map((_, index) => index),
            appPaginationOf: this.appPaginationOf as T[],
        };
    }

    private selectIndex(index: number) {
        this.currentPage$.next(index);
    }

    private next() {
        const nextIndex = this.currentPage$.value + 1;
        const newIndex = nextIndex < this.groupedItems.length ? nextIndex : 0;

        this.currentPage$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentPage$.value - 1;
        const newIndex = previousIndex >= 0 ? previousIndex : this.groupedItems.length - 1;

        this.currentPage$.next(newIndex);
    }

    static ngTemplateContextGuard<T>(
        _directive: PaginationDirective<T>,
        _context: unknown,
    ): _context is IPaginationContext<T> {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appPaginationOf<T>(
        _directive: PaginationDirective<T>,
        _inputValue: unknown,
    ): _inputValue is T[] {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appPaginationChankSize<T>(
        _directive: PaginationDirective<T>,
        _inputValue: unknown,
    ): _inputValue is number {
        return true;
    }
}
