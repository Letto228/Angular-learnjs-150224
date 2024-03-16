import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './scroll-with-loading';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    readonly borderOffset = 100;
    lastScrollTop = 0;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        if (
            scrollTop > this.lastScrollTop &&
            scrollTop + clientHeight >= scrollHeight - this.borderOffset
        ) {
            this.loadData.emit(LoadDirection.BOTTOM);
            this.lastScrollTop = scrollTop;

            return;
        }

        if (scrollTop <= this.lastScrollTop && scrollTop <= this.borderOffset) {
            this.loadData.emit(LoadDirection.TOP);
            this.lastScrollTop = scrollTop;
        }
    }
}
