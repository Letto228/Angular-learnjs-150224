import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './app-scroll.enums';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class AppScrollWithLoadingDirective {
    readonly borderOffset = 100;
    private activeTopBorder = false;
    private scrollTopSaved = 0;

    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', ['$event.srcElement'])
    onWindowScroll($event: HTMLElement) {
        this.onWindowScrollHandler($event);
    }

    private onWindowScrollHandler(event: HTMLElement) {
        const bottomBorder = event.scrollHeight - (event.offsetHeight + this.borderOffset);

        if (event.scrollTop > bottomBorder && this.scrollTopSaved < event.scrollTop) {
            this.loadData.emit(LoadDirection.scrollBottom);
            this.activeTopBorder = true;
            this.scrollTopSaved = event.scrollTop;
            // eslint-disable-next-line @typescript-eslint/padding-line-between-statements
            return;
        }

        if (
            this.activeTopBorder &&
            event.scrollTop < this.borderOffset &&
            this.scrollTopSaved > event.scrollTop
        ) {
            this.loadData.emit(LoadDirection.scrollTop);
            this.scrollTopSaved = event.scrollTop;
        }
    }
}
