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
import {IPaginationCotext} from './pagination.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnInit, OnChanges, OnDestroy {
    @Input() appPaginationOf: T[] | null | undefined;
    @Input() appPaginationChankSize = 1;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    private get pageCount(): number {
        if (this.appPaginationOf?.length) {
            return this.countPage;
        }

        return 0;
    }

    private get countPage(): number {
        return this.appPaginationOf?.length
            ? Math.ceil(this.appPaginationOf.length / this.appPaginationChankSize)
            : 0;
    }

    private get pageNumbers(): number[] {
        const pageNumbers = new Array(this.pageCount);

        if (this.pageCount) {
            for (let index = 0; index < this.pageCount; index++) {
                pageNumbers[index] = index + 1;
            }
        }

        return pageNumbers;
    }

    private get currentItems(): T[] {
        const appPaginationOf = this.appPaginationOf as T[];
        const currentChankStartIndex = this.currentIndex$.value * this.appPaginationChankSize;

        return appPaginationOf.slice(
            currentChankStartIndex,
            currentChankStartIndex + this.appPaginationChankSize,
        );
    }

    private get shouldShowItems(): boolean {
        return !!this.appPaginationOf?.length;
    }

    constructor(
        private readonly templateRef: TemplateRef<IPaginationCotext<T>>,
        private readonly viewContainerRef: ViewContainerRef,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges): void {
        if (appPaginationOf || appPaginationChankSize) {
            this.updateView();
        }
    }

    ngOnInit(): void {
        this.listenCurrentIndex();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView() {
        if (this.shouldShowItems) {
            this.currentIndex$.next(0);

            return;
        }

        this.viewContainerRef.clear();
    }

    private listenCurrentIndex(): void {
        this.currentIndex$
            .pipe(
                filter(() => this.shouldShowItems),
                map(paginationIndex => this.getCurrentContext(paginationIndex)),
                takeUntil(this.destroy$),
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(paginationIndex: number): IPaginationCotext<T> {
        const appPaginationOf = this.appPaginationOf as T[];

        return {
            $implicit: this.currentItems,
            appPaginationOf,
            appPaginationChankSize: this.appPaginationChankSize,
            pageNumbers: this.pageNumbers,
            pageCount: this.pageCount,
            index: paginationIndex,
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            selectIndex: this.selectIndex.bind(this),
        };
    }

    private next(): void {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.pageCount ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back(): void {
        const previousIndex = this.currentIndex$.value - 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastIndex = this.pageCount - 1;
        const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

        this.currentIndex$.next(newIndex);
    }

    private selectIndex(paginationIndex: number): void {
        if (paginationIndex !== this.currentIndex$.value) {
            this.currentIndex$.next(paginationIndex);
        }
    }

    static ngTemplateContextGuard<T>(
        _directive: PaginationDirective<T>,
        _context: unknown,
    ): _context is IPaginationCotext<T> {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appPaginationOf<T>(
        _directive: PaginationDirective<T>,
        _inputValue: unknown,
    ): _inputValue is [T, ...T[]] {
        return true;
    }
}
