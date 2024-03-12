import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

export enum LoadDirection {
    TOP = 'top',
    BOTTOM = 'bottom',
}

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData: EventEmitter<LoadDirection> = new EventEmitter<LoadDirection>();

    borderOffset = 100;
    lastScrollTop = 0;

    @HostListener('scroll', ['$event.target'])
    onScroll(target: HTMLElement) {
        const scrollTop = target.scrollTop;

        if (scrollTop > this.lastScrollTop) {
            if (target.scrollTop + target.clientHeight >= target.scrollHeight - this.borderOffset) {
                this.loadData.emit(LoadDirection.BOTTOM);
            }
        } else if (target.scrollTop <= this.borderOffset) {
            this.loadData.emit(LoadDirection.TOP);
        }

        this.lastScrollTop = scrollTop;
    }
}
