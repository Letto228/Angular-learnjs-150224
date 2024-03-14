import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    private readonly borderOffset = 100;
    private isEventEmitted = false;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const scrollMaxLengthWithoutEvent = scrollHeight - clientHeight - this.borderOffset;

        if (scrollTop < scrollMaxLengthWithoutEvent && scrollTop > this.borderOffset) {
            this.isEventEmitted = false;

            return;
        }

        if (!this.isEventEmitted) {
            this.emitLoadDataEvent(scrollTop, scrollMaxLengthWithoutEvent);
            this.isEventEmitted = true;
        }
    }

    private emitLoadDataEvent(scrollPosition: number, scrollMaxLengthWithoutEvent: number) {
        this.loadData.emit(
            scrollPosition > scrollMaxLengthWithoutEvent ? LoadDirection.Down : LoadDirection.Up,
        );
    }
}
