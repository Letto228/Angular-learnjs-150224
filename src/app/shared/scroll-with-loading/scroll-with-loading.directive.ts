import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

export enum LoadDirection {
    Top,
    Bottom,
}

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    private lastScrollTop = true;
    private lastScrollBottom = false;

    @HostListener('scroll', ['$event'])
    onScroll(event: Event) {
        const target = event.target as HTMLInputElement;
        const scrollTop = target.scrollTop;
        const scrollBottom = target.scrollHeight - scrollTop - target.clientHeight;
        const targetHeight = target.scrollHeight - target.clientHeight;

        if (targetHeight - scrollBottom <= 100) {
            if (!this.lastScrollTop) {
                this.lastScrollTop = true;
                this.onLoadData(LoadDirection.Top);
            }
        } else {
            this.lastScrollTop = false;
        }

        if (targetHeight - scrollTop <= 100) {
            if (!this.lastScrollBottom) {
                this.lastScrollBottom = true;
                this.onLoadData(LoadDirection.Bottom);
            }
        } else {
            this.lastScrollBottom = false;
        }
    }

    onLoadData(direction: LoadDirection) {
        this.loadData.emit(direction);
    }
}
