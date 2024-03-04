import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
// eslint-disable-next-line import/no-deprecated
import {PopupHostComponent} from './popup-host.component'

@NgModule({
  declarations: [PopupHostComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [PopupHostComponent],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
  ],
})
export class PopupHostModule {}
