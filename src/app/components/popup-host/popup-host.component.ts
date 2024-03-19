import {Component, Inject, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface IPopupHostConfig {
    title?: string;
    dialogContent: TemplateRef<unknown | undefined>;
}

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    isCustomDialogShow: boolean | null = null;

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly vcRef!: ViewContainerRef | undefined;

    @Input() set template(template: TemplateRef<unknown>) {
        this.isCustomDialogShow = !!template;

        this.vcRef?.clear();

        if (template) {
            this.vcRef?.createEmbeddedView(template);
            setTimeout(() => {
                this.vcRef?.clear();
                this.isCustomDialogShow = null;
            }, 3000);
        }
    }

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: IPopupHostConfig,
    ) {
        data.title ?? 'Unnamed Dialog';

        if (data && this.isCustomDialogShow === null) {
            this.isCustomDialogShow = false;
        }
    }
}
