import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[appScrollInfinity]',
})
export class ScrollInfinityDirective {
    @Output() loadData = new EventEmitter<string>();

    readonly borderOffset = 100;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollHeight, scrollTop, clientHeight}: HTMLElement) {
        if (scrollTop <= this.borderOffset) {
            this.loadData.emit('bottom');

            return;
        }

        const bottomHeight = scrollHeight - scrollTop - clientHeight;

        if (bottomHeight <= this.borderOffset) {
            this.loadData.emit('top');
        }
    }
}
