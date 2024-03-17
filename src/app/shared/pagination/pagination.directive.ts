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
import {Product} from 'src/app/shared/products/product.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: Product[] | null | undefined;

    chankSize = 4;

    private readonly currentPage$ = new BehaviorSubject<number>(1);
    private readonly destroy$ = new Subject<void>();

    private get shouldShowItems(): boolean {
        return !!this.appPaginationOf?.length;
    }

    private get shouldShowPagination(): boolean {
        return !!this.appPaginationOf && this.appPaginationOf.length > this.chankSize;
    }

    private get pageIndexes(): number {
        return this.appPaginationOf ? Math.ceil(this.appPaginationOf.length / this.chankSize) : 1;
    }

    private get pageIndexesArray(): number[] {
        return Array.from(new Array(this.pageIndexes).keys());
    }

    constructor(
        private readonly templateRef: TemplateRef<PaginationContext>,
        private readonly viewContainerRef: ViewContainerRef,
    ) {}

    ngOnChanges({appPaginationOf}: SimpleChanges): void {
        if (appPaginationOf) {
            this.updateView();
        }
    }

    ngOnInit(): void {
        this.listenCurrentPage();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView(): void {
        if (this.shouldShowItems) {
            this.currentPage$.next(1);

            return;
        }

        this.viewContainerRef.clear();
    }

    private listenCurrentPage() {
        this.currentPage$
            .pipe(
                filter(() => this.shouldShowItems),
                map(currentPage => this.getCurrentContext(currentPage)),
                takeUntil(this.destroy$),
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(currentPage: number): PaginationContext {
        const appPaginationOf = this.appPaginationOf as Product[];

        const firstIndexOfGroup = currentPage * this.chankSize - this.chankSize;
        const lastIndexOfGroup = currentPage * this.chankSize;

        const paginationGroup = appPaginationOf.slice(firstIndexOfGroup, lastIndexOfGroup);

        return {
            $implicit: paginationGroup,
            pageIndexes: this.pageIndexes,
            pageIndexesArray: this.pageIndexesArray,
            page: currentPage,
            appPaginationOf,
            next: () => this.next(),
            back: () => this.back(),
            go: pageIndex => this.go(pageIndex),
            shouldShowPagination: this.shouldShowPagination,
        };
    }

    private next(): void {
        const nextPage = this.currentPage$.value + 1;

        this.currentPage$.next(nextPage);
    }

    private back(): void {
        const previousPage = this.currentPage$.value - 1;

        this.currentPage$.next(previousPage);
    }

    private go(pageIndex: number): void {
        const selectedPage = pageIndex + 1;

        this.currentPage$.next(selectedPage);
    }

    static ngTemplateContextGuard(
        _directive: PaginationDirective,
        _context: unknown,
    ): _context is PaginationContext {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appPaginationOf(
        _directive: PaginationDirective,
        _inputValue: unknown,
    ): _inputValue is Product[] {
        return true;
    }
}
