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
import {PaginationInterface} from './pagination-interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | null | undefined;
    @Input() appPaginationChankSize = 4;

    private readonly currentPage$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    private get shouldShowPages(): boolean {
        return !!this.appPaginationOf?.length;
    }

    constructor(
        private readonly templateRef: TemplateRef<any>,
        private readonly viewContainerRef: ViewContainerRef,
    ) {}

    ngOnChanges({appPaginationOf}: SimpleChanges): void {
        if (appPaginationOf) {
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
            .subscribe(context => this.renderPage(context.activeIndex, context));
    }

    private getCurrentContext(currentPageIndex: number): PaginationInterface<T> {
        const appPaginationOf: T[] = this.appPaginationOf as T[];

        return {
            next: this.next,
            back: this.back,
            activeIndex: currentPageIndex,
            chankSize: this.appPaginationChankSize,
            pageIndexes: Math.min(
                currentPageIndex * this.appPaginationChankSize + this.appPaginationChankSize,
                appPaginationOf.length,
            ),
            $implicit: appPaginationOf[currentPageIndex],
            selectIndex: () => {
                // something
            },
        };
    }

    private renderPage(currentPage: number, context: PaginationInterface<T>) {
        if (!this.appPaginationOf || this.appPaginationOf.length === 0) {
            this.viewContainerRef.clear();

            return;
        }

        const startIndex = currentPage * this.appPaginationChankSize;
        const endIndex = Math.min(
            startIndex + this.appPaginationChankSize,
            this.appPaginationOf.length,
        );

        this.viewContainerRef.clear();

        for (let i = startIndex; i < endIndex; i++) {
            this.viewContainerRef.createEmbeddedView(this.templateRef, context);
        }
    }

    next() {
        if (this.appPaginationOf) {
            const totalPages = Math.ceil(this.appPaginationOf.length / this.appPaginationChankSize);
            const nextPage = (this.currentPage$.value + 1) % totalPages;

            this.currentPage$.next(nextPage);
        }
    }

    back() {
        if (this.appPaginationOf) {
            // "this.appPaginationOf!.length" - has error: ESLint: Forbidden non-null assertion.(@typescript-eslint/no-non-null-assertion)
            const totalPages = Math.ceil(this.appPaginationOf.length / this.appPaginationChankSize);
            const prevPage = (this.currentPage$.value - 1 + totalPages) % totalPages;

            this.currentPage$.next(prevPage);
        }
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
