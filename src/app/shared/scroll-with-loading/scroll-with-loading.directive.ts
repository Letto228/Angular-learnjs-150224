import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from 'src/app/shared/scroll-with-loading/scroll-with-loading.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    borderSize = 100;

    private lastScrollTop = true;
    private lastScrollBottom = false;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const scrollBottom = scrollHeight - scrollTop - clientHeight;

        if (scrollTop <= this.borderSize) {
            if (!this.lastScrollTop) {
                this.lastScrollTop = true;
                this.onLoadData(LoadDirection.Top);
            }
        } else {
            this.lastScrollTop = false;
        }

        if (scrollBottom <= this.borderSize) {
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
