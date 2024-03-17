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
import {PaginationInterface} from './pagination.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | null | undefined;
    @Input() appPaginationChunkSize = 4;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    private elementsOnPages: T[][] = [];

    private get shouldShowPagination(): boolean {
        return !!this.elementsOnPages?.length;
    }

    constructor(
        private readonly templateRef: TemplateRef<PaginationInterface<T>>,
        private readonly viewContainerRef: ViewContainerRef,
    ) {}

    ngOnChanges({appPaginationOf}: SimpleChanges): void {
        if (appPaginationOf) {
            this.updateView();
        }
    }

    ngOnInit(): void {
        this.elementsOnPages = this.paginateElements();
        this.listenCurrentIndex();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    @HostListener('window:keydown', ['$event'])
    keydown(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.back();
        }

        if (event.key === 'ArrowRight') {
            this.next();
        }
    }

    private updateView() {
        this.currentIndex$.next(0);
        this.elementsOnPages = [];
        this.viewContainerRef.clear();
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
            $implicit: this.elementsOnPages[currentIndex],
            pageIndex: currentIndex + 1,
            appPaginationOf: this.elementsOnPages,
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
        };
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.elementsOnPages.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        const lastIndex = this.elementsOnPages.length - 1;
        const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

        this.currentIndex$.next(newIndex);
    }

    private paginateElements(): T[][] {
        if (!this.appPaginationOf) {
            return [];
        }

        const pages = [];

        while (this.appPaginationOf.length > 0) {
            pages.push(this.appPaginationOf.splice(0, this.appPaginationChunkSize));
        }

        return pages;
    }
}
