import {
    Directive,
    Input,
    OnChanges,
    OnInit,
    OnDestroy,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject, Subject, filter, map, takeUntil} from 'rxjs';
import {PaginationContext} from 'src/app/shared/pagination/pagination.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | null | undefined;
    @Input() appPaginationChankSize = 4;

    private readonly activeIndex$ = new BehaviorSubject<number>(1);
    private readonly destroy$ = new Subject<void>();
    private pagesCount = 1;
    private paginationGroup: T[] = [];

    private get shouldShowItems(): boolean {
        return !!this.appPaginationOf?.length;
    }

    private get shouldShowPagination(): boolean {
        return !!this.appPaginationOf && this.appPaginationOf.length > this.appPaginationChankSize;
    }

    private get pageIndexes(): number[] {
        return Array.from(new Array(this.pagesCount).keys(), index => index + 1);
    }

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<PaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf}: SimpleChanges): void {
        if (appPaginationOf) {
            this.updateView();
        }
    }

    ngOnInit(): void {
        this.listenActivePage();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView(): void {
        if (this.shouldShowItems) {
            this.pagesCount = Math.ceil(this.appPaginationOf!.length / this.appPaginationChankSize);

            this.activeIndex$.next(1);

            return;
        }

        this.viewContainerRef.clear();
    }

    private listenActivePage() {
        this.activeIndex$
            .pipe(
                filter(() => this.shouldShowItems),
                map(activeIndex => this.getCurrentContext(activeIndex)),
                takeUntil(this.destroy$),
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(activeIndex: number): PaginationContext<T> {
        const appPaginationOf = this.appPaginationOf as T[];

        this.updatePaginationGroup(appPaginationOf, activeIndex);

        return {
            $implicit: this.paginationGroup,
            pageIndexes: this.pageIndexes,
            activeIndex,
            appPaginationOf,
            next: () => this.next(),
            back: () => this.back(),
            selectIndex: pageIndex => this.selectIndex(pageIndex),
            shouldShowPagination: this.shouldShowPagination,
        };
    }

    private updatePaginationGroup(appPaginationOf: T[], activeIndex: number): void {
        const lastIndexOfGroup = activeIndex * this.appPaginationChankSize;
        const firstIndexOfGroup = lastIndexOfGroup - this.appPaginationChankSize;

        this.paginationGroup = appPaginationOf.slice(firstIndexOfGroup, lastIndexOfGroup);
    }

    private next(): void {
        const nextPage = this.activeIndex$.value + 1;

        this.activeIndex$.next(nextPage);
    }

    private back(): void {
        const previousPage = this.activeIndex$.value - 1;

        this.activeIndex$.next(previousPage);
    }

    private selectIndex(pageIndex: number): void {
        this.activeIndex$.next(pageIndex);
    }

    static ngTemplateContextGuard<T>(
        _directive: PaginationDirective<T>,
        _context: unknown,
    ): _context is PaginationContext<T> {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appPaginationOf<T>(
        _directive: PaginationDirective<T>,
        _inputValue: unknown,
    ): _inputValue is T[] {
        return true;
    }
}
