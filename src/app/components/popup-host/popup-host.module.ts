import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopupHostComponent} from './popup-host.component';

@NgModule({
    declarations: [PopupHostComponent],
    exports: [PopupHostComponent],
    imports: [CommonModule],
})
export class PopupHostModule {}
