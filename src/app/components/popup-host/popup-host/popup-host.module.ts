import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {PopupHostComponent} from './popup-host.component';

@NgModule({
    declarations: [PopupHostComponent],
    imports: [CommonModule, MatDialogModule],
    exports: [PopupHostComponent],
})
export class PopupHostModule {}
