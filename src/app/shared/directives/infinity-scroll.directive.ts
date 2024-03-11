import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class InfinityScrollDirective {
    @Output() loadData: EventEmitter<string> = new EventEmitter<string>();
    @Input() threshold = 100;

    @HostListener('scroll', ['$event'])
    onScrollEvent(event: Event) {
        const height = (event?.target as HTMLElement).clientHeight;
        const scrollHeight = (event?.target as HTMLElement).scrollHeight;
        const scrollY = (event?.target as HTMLElement).scrollTop;

        if (scrollY <= this.threshold && scrollY > 0) {
            this.loadData.emit('top');
        }

        if (scrollY + height + this.threshold >= scrollHeight && scrollY > 0) {
            this.loadData.emit('bottom');
        }
    }
}
