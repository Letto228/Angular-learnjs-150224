import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {debounceTime, Subject} from 'rxjs';
import {InfiniteScrollDirection} from './infinite-scroll-direction.enum';

@Directive({
    selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
    @Input() borderOffset: number;
    @Input() delay: number;
    @Output() loadData = new EventEmitter<InfiniteScrollDirection>();

    private readonly scrollEventSubject = new Subject<InfiniteScrollDirection>();
    @HostListener('scroll', ['$event'])
    onScroll(event: Event): void {
        const target = event.target as Element;
        const position = target.scrollTop + target.clientHeight;
        const maxPosition = target.scrollHeight;

        if (target.scrollTop <= this.borderOffset) {
            this.scrollEventSubject.next(InfiniteScrollDirection.Top);
        } else if (maxPosition - position <= this.borderOffset) {
            this.scrollEventSubject.next(InfiniteScrollDirection.Bottom);
        }
    }

    constructor() {
        this.borderOffset = 50;
        this.delay = 1000;

        this.scrollEventSubject.pipe(debounceTime(this.delay)).subscribe(direction => {
            this.loadData.emit(direction);
        });
    }
}
