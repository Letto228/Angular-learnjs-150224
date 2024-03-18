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
import {BehaviorSubject, filter, map, Subject, takeUntil} from 'rxjs';
import {chunk} from 'lodash';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize = 4;

    private groupedItems: T[][] = [];

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly viewContainer: ViewContainerRef,
        private readonly template: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges) {
        if (appPaginationOf || appPaginationChankSize) {
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
        if (!this.shouldShowItems) {
            this.viewContainer.clear();

            return;
        }

        this.groupedItems = chunk(this.appPaginationOf, this.appPaginationChankSize);
        this.currentIndex$.next(0);
    }

    private listenCurrentIndex() {
        this.currentIndex$
            .pipe(
                map(currentIndex => this.shouldShowItems() && this.getCurrentContext(currentIndex)),
                filter(Boolean),
                takeUntil(this.destroy$),
            )
            .subscribe(context => {
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.template, context);
            });
    }

    private shouldShowItems(
        this: PaginationDirective<T>,
    ): this is PaginationDirective<T> & {appPaginationOf: T[]} {
        return !!this.appPaginationOf?.length;
    }

    private getCurrentContext(
        this: PaginationDirective<T> & {appPaginationOf: T[]},
        currentIndex: number,
    ): IPaginationContext<T> {
        return {
            $implicit: this.groupedItems[currentIndex],
            index: currentIndex,
            pageIndexes: this.groupedItems.map((_, index) => index),
            appPaginationOf: this.appPaginationOf,
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

    private next(this: PaginationDirective<T> & {appPaginationOf: T[]}) {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.groupedItems.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back(this: PaginationDirective<T> & {appPaginationOf: T[]}) {
        const previousIndex = this.currentIndex$.value - 1;
        const newIndex = previousIndex >= 0 ? previousIndex : this.groupedItems.length - 1;

        this.currentIndex$.next(newIndex);
    }

    private selectIndex(index: number) {
        this.currentIndex$.next(index);
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
        _inputValue: T[] | undefined | null,
    ): _inputValue is T[] {
        return true;
    }
}
