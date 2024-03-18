import {Directive, EventEmitter, Output, HostListener} from '@angular/core';
import {LoadDirection} from './enum/load-directions';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    private readonly borderOffset = 100;
    private prevScrollTop = 0;

    @Output() loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, scrollHeight, clientHeight}: HTMLElement) {
        const scrollToTop = scrollTop <= this.borderOffset && scrollTop < this.prevScrollTop;
        const scrollToBottom =
            scrollTop + clientHeight + this.borderOffset >= scrollHeight &&
            scrollTop > this.prevScrollTop;

        if (scrollToTop) {
            // eslint-disable-next-line no-console
            console.log('Scroll to top');
            this.loadData.emit(LoadDirection.Top);
        }

        if (scrollToBottom) {
            // eslint-disable-next-line no-console
            console.log('Scroll to bottom');
            this.loadData.emit(LoadDirection.Bottom);
        }

        this.prevScrollTop = scrollTop;
    }
}
