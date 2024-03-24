import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from 'src/app/shared/scroll-with-loading/scroll-with-loading.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    borderSize = 100;

    private lastScrollTop = true;
    private lastScrollBottom = false;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const scrollBottom = scrollHeight - scrollTop - clientHeight;

        const isTopIntersection = scrollTop <= this.borderSize;
        const isBottomIntersection = scrollBottom <= this.borderSize;

        if (isTopIntersection && !this.lastScrollTop) {
            this.onLoadData(LoadDirection.Top);
        }

        if (isBottomIntersection && !this.lastScrollBottom) {
            this.onLoadData(LoadDirection.Bottom);
        }

        this.lastScrollBottom = isBottomIntersection;
        this.lastScrollTop = isTopIntersection;
    }

    onLoadData(direction: LoadDirection) {
        this.loadData.emit(direction);
    }
}
