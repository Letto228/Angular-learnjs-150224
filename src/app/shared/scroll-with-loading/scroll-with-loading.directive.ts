import {Directive, EventEmitter, Output, HostListener} from '@angular/core';

export enum LoadDirection {
    Top = 'top',
    Bottom = 'bottom',
}

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    private readonly borderOffset = 100;
    private prevScrollTop = 0;

    @Output() loadData: EventEmitter<LoadDirection> = new EventEmitter<LoadDirection>();

    @HostListener('scroll', ['$event'])
    onScroll(event: Event) {
        const targetEl = event.target as HTMLElement;
        const heightTargetEl = targetEl.scrollHeight;
        const currentScrollTop = targetEl.scrollTop;
        const scrollToTop =
            currentScrollTop <= this.borderOffset && currentScrollTop < this.prevScrollTop;
        const scrollToBottom =
            currentScrollTop + targetEl.clientHeight + this.borderOffset >= heightTargetEl &&
            currentScrollTop > this.prevScrollTop;

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

        this.prevScrollTop = currentScrollTop;
    }
}
