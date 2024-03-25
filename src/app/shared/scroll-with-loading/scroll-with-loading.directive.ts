import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-directions';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    private lastTopOffset = 0;
    private lastLoad: 'top' | 'bottom' | '' = '';
    private eventTargetElement!: HTMLElement;

    private get topOffser(): number {
        return this.eventTargetElement.scrollTop;
    }

    private get bottomOffset(): number {
        return (
            this.eventTargetElement.scrollHeight -
            this.topOffser -
            this.eventTargetElement.clientHeight
        );
    }

    private get scrollDirection(): 'top' | 'bottom' {
        const currentTopOffset = this.lastTopOffset;

        this.lastTopOffset = this.topOffser;

        return currentTopOffset - this.topOffser < 0 ? 'bottom' : 'top';
    }

    private get loadTop(): boolean {
        const topOffsetLoadLimit = 100;

        if (
            this.eventTargetElement.scrollTop < topOffsetLoadLimit &&
            this.scrollDirection === 'top'
        ) {
            this.lastLoad = 'top';

            return true;
        }

        return false;
    }

    private get loadBottom(): boolean {
        const loadBottom = !!(this.bottomOffset < 100 && this.scrollDirection === 'bottom');

        this.lastLoad = loadBottom ? 'bottom' : this.lastLoad;

        return loadBottom;
    }

    @Output() loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', ['$event.target'])
    onscroll(target: HTMLElement) {
        if (this.eventTargetElement !== target) {
            this.eventTargetElement = target;
        }

        if (this.loadBottom) {
            this.loadData.emit(LoadDirection.scrollBottom);

            return;
        }

        if (this.loadTop) {
            this.loadData.emit(LoadDirection.scrollTop);

            return;
        }

        this.loadData.emit(LoadDirection.scrollNone);
    }

    constructor(private readonly elemRef: ElementRef<HTMLElement>) {}
}
