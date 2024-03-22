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
import {chunk} from 'lodash';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IPaginationContext} from './pagination.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize = 4;

    private groupedItems: T[][] = []; // массив постраничных массив карточек

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private subscribtion: Subscription | null = null;

    constructor(
        private readonly viewContainer: ViewContainerRef,
        private readonly template: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges) {
        if (appPaginationOf || appPaginationChankSize) {
            this.update();
        }
    }

    ngOnInit() {
        this.getSubscriptionByInx();
    }

    private areItemsThere() {
        return Boolean(this.appPaginationOf?.length);
    }

    private update() {
        if (!this.areItemsThere()) {
            this.viewContainer.clear();

            return;
        }

        this.groupedItems = chunk(this.appPaginationOf, this.appPaginationChankSize);
        this.currentIndex$.next(0);
    }

    private getSubscriptionByInx() {
        this.subscribtion = this.currentIndex$.subscribe(currentIndex => {
            if (this.areItemsThere()) {
                const context = this.getContext(currentIndex);

                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.template, context);
            }
        });
    }

    private getContext(currentIndex: number): IPaginationContext<T> {
        return {
            $implicit: this.groupedItems[currentIndex],
            index: currentIndex,
            pageIndexes: Array.from({length: this.groupedItems.length}, (_, index) => index),
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
        const newIndex = previousIndex >= 0 ? previousIndex : this.groupedItems.length - 1;

        this.currentIndex$.next(newIndex);
    }

    private selectIndex(index: number) {
        this.currentIndex$.next(index);
    }

    ngOnDestroy() {
        this.subscribtion?.unsubscribe();
    }
}
