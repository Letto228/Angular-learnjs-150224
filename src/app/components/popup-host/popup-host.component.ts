import {
  Component,
  Inject,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

export interface IPopupHostConfig {
  title?: string
  dialogContent: TemplateRef<unknown | undefined>
}

@Component({
  selector: 'app-popup-host',
  templateUrl: './popup-host.component.html',
  styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
  isCustomDialogShow = false

  @ViewChild('viewport', {read: ViewContainerRef, static: true})
  private readonly vcRef!: ViewContainerRef

  @Input() set template(template: TemplateRef<unknown | undefined>) {
    this.isCustomDialogShow = !!template

    if (this.isCustomDialogShow) {
      return
    }

    this.clear()

    this.vcRef.createEmbeddedView(template)
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IPopupHostConfig
  ) {
    data.title ?? 'Unnamed Dialog'
  }

  clear(): void {
    this.vcRef?.clear()
  }
}
