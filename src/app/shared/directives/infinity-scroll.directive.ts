import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class InfinityScrollDirective {
    @Output() loadData = new EventEmitter<string>();
    @Input() threshold = 100;

    private prevScrollTop = 0;

    @HostListener('scroll', ['$event.target'])
    onScrollEvent({scrollTop, scrollHeight, clientHeight}: HTMLElement) {
        const scrollToTop = scrollTop <= this.threshold && scrollTop < this.prevScrollTop;
        const scrollToBottom =
            scrollTop + clientHeight + this.threshold >= scrollHeight &&
            scrollTop > this.prevScrollTop;

        if (scrollToTop) {
            // eslint-disable-next-line no-console
            console.log('Scroll to top');
            this.loadData.emit('top');
        }

        if (scrollToBottom) {
            // eslint-disable-next-line no-console
            console.log('Scroll to bottom');
            this.loadData.emit('bottom');
        }

        this.prevScrollTop = scrollTop;
    }
}
