import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[appInsertShadow]',
})
export class InsertShadowDirective {
    private isShadowActive = false;

    @HostListener('click')
    onClick() {
        this.isShadowActive = !this.isShadowActive;
    }

    @HostBinding('style.boxShadow')
    get boxShadow(): string {
        return this.isShadowActive ? 'inset 0 0 10px #000' : '';
    }
}
