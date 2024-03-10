import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    private readonly borderOffset = 100;
    private isEventEmitted = false;

    @HostListener('scroll', [
        '$event.srcElement.scrollTop',
        '$event.srcElement.scrollHeight',
        '$event.srcElement.clientHeight',
    ])
    onScroll(scrollPosition: number, scrollHeight: number, clientHeight: number) {
        const scrollMaxLengthWithoutEvent = scrollHeight - clientHeight - this.borderOffset;

        if (scrollPosition < scrollMaxLengthWithoutEvent && scrollPosition > this.borderOffset) {
            this.isEventEmitted = false;

            return;
        }

        if (!this.isEventEmitted) {
            this.emitLoadDataEvent(scrollPosition, scrollMaxLengthWithoutEvent);
            this.isEventEmitted = true;
        }
    }

    private emitLoadDataEvent(scrollPosition: number, scrollMaxLengthWithoutEvent: number) {
        if (scrollPosition > scrollMaxLengthWithoutEvent) {
            this.loadData.emit(LoadDirection.Down);
        } else if (scrollPosition < this.borderOffset) {
            this.loadData.emit(LoadDirection.Up);
        }
    }
}
