import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @Input() set template(template: TemplateRef<unknown> | null) {
        this.updatePopapTemplate(template);
    }

    // eslint-disable-next-line @typescript-eslint/prefer-readonly
    @ViewChild('popup', {read: ViewContainerRef, static: true})
    private popup: ViewContainerRef | undefined;

    get isPopupExist(): boolean {
        return !!this.popup?.length;
    }

    private updatePopapTemplate(template: TemplateRef<unknown> | null) {
        this.popup?.clear();

        if (template) {
            this.popup?.createEmbeddedView(template);
        }
    }
}
