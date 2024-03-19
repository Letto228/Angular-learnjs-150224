import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LoadDirection} from './scroll-loading-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const borderOffset = 100;
        const topAlarm: boolean = scrollTop < borderOffset && scrollTop < this.scrollTop$.value;
        // мне не нравится, но как смогло
        const bottomAlarm: boolean =
            scrollHeight - clientHeight - scrollTop < borderOffset &&
            scrollTop > this.scrollTop$.value;

        if (scrollTop < this.scrollTop$.value && topAlarm) {
            this.loadData.emit(LoadDirection.ScrollTop);
            this.scrollTop$.next(scrollTop);
        }

        if (scrollTop > this.scrollTop$.value && bottomAlarm) {
            this.loadData.emit(LoadDirection.ScrollBottom);
            this.scrollTop$.next(scrollTop);
        }
    }

    private readonly scrollTop$ = new BehaviorSubject<number>(0);
}
