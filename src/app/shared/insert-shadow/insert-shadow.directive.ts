import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[appInsertShadow]',
})
export class InsertShadowDirective {
    // @HostListener('touchstart', [
    //     '$event.changedTouches[0].clientX',
    //     '$event.changedTouches[0].clientY',
    // ])
    // @HostListener('click', ['$event.clientX', '$event.clientY'])
    // // @HostListener('window:click', ['$event.clientX', '$event.clientY'])
    // onClick(clientX: number, clientY: number) {
    //     console.log('appInsertShadow Click', clientX, clientY);
    // }

    // V1
    // @HostListener('click') // <host-element (click)="onClick()">
    // onClick() {
    //     this.boxShadow = this.boxShadow ? '' : 'inset 0 0 10px #000';
    // }

    // @HostBinding('style.boxShadow') // <host-element [style.boxShadow]="boxShadow">
    // boxShadow = '';

    // V2
    private isShadowActive = false;

    @HostListener('click')
    onClick() {
        // eslint-disable-next-line no-console
        console.log(this.elementRef.nativeElement);

        this.isShadowActive = !this.isShadowActive;
    }

    @HostBinding('style.boxShadow')
    get boxShadow(): string {
        return this.isShadowActive ? 'inset 0 0 10px #000' : '';
    }

    constructor(private readonly elementRef: ElementRef<HTMLElement>) {}
}
