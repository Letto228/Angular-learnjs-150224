import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './scroll.interface';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    borderOffset = 100;
    lastScroll = 0;

    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', [
        '$event.srcElement.scrollHeight',
        '$event.srcElement.scrollTop',
        '$event.srcElement.offsetHeight',
    ])
    onScroll(scrollHeight: number, scrollTop: number, offsetHeight: number) {
        const isScrollTop = scrollTop <= this.borderOffset && this.lastScroll > scrollTop;
        const isScrollBottom =
            scrollTop >= scrollHeight - offsetHeight - this.borderOffset &&
            this.lastScroll <= scrollTop;

        if (isScrollTop) {
            this.loadData.emit(LoadDirection.top);
        }

        if (isScrollBottom) {
            this.loadData.emit(LoadDirection.bottom);
        }

        this.lastScroll = scrollTop;
    }
}
