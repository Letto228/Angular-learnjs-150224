import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {PopupHostComponent} from './popup-host.component';

@NgModule({
    declarations: [PopupHostComponent],
    imports: [CommonModule, MatButtonModule],
    exports: [PopupHostComponent],
})
export class PopupHostModule {}
