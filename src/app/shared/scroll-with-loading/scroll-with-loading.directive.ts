import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from '../application-config/load-directions';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    private lastTopOffset = 0;
    private lastLoad: 'top' | 'bottom' | '' = '';

    private get topOffser(): number {
        return this.elemRef.nativeElement.scrollTop;
    }

    private get bottomOffset(): number {
        return (
            this.elemRef.nativeElement.scrollHeight -
            this.topOffser -
            this.elemRef.nativeElement.clientHeight
        );
    }

    private get scrollDirection(): 'top' | 'bottom' {
        if (this.lastTopOffset - this.topOffser < 0) {
            this.lastTopOffset = this.topOffser;

            return 'bottom';
        }

        this.lastTopOffset = this.topOffser;

        return 'top';
    }

    private get loadTop(): boolean {
        if (this.elemRef.nativeElement.scrollTop < 100 && this.scrollDirection === 'top') {
            this.lastLoad = 'top';

            return true;
        }

        return false;
    }

    private get loadBottom(): boolean {
        if (this.bottomOffset < 100 && this.scrollDirection === 'bottom') {
            this.lastLoad = 'bottom';

            return true;
        }

        return false;
    }

    @Output() loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll')
    onscroll() {
        if (this.loadBottom) {
            this.loadData.emit(LoadDirection.scrollBottom);
        } else if (this.loadTop) {
            this.loadData.emit(LoadDirection.scrollTop);
        } else {
            this.loadData.emit(LoadDirection.scrollNone);
        }
    }

    constructor(private readonly elemRef: ElementRef<HTMLElement>) {}
}
