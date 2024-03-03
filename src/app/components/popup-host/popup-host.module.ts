import {NgModule} from '@angular/core';
import {PopupHostComponent} from './popup-host.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    declarations: [PopupHostComponent],
    imports: [MatDialogModule],
    exports: [PopupHostComponent],
})
export class PopupHostModule {}
