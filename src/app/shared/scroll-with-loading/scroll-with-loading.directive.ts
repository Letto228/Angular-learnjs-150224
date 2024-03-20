import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './scroll.interface';
import {borderOffset} from './constants/border-offset';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    lastScroll = 0;

    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const isScrollToTop = this.lastScroll > scrollTop;
        const isScrollTop = scrollTop <= borderOffset && isScrollToTop;
        const isScrollBottom =
            scrollTop >= scrollHeight - clientHeight - borderOffset && !isScrollToTop;

        if (isScrollTop) {
            this.loadData.emit(LoadDirection.top);
        }

        if (isScrollBottom) {
            this.loadData.emit(LoadDirection.bottom);
        }

        this.lastScroll = scrollTop;
    }
}
