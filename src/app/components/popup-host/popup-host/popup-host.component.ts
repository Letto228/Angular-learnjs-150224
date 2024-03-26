import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    popupActive = false;

    @Input() set template(template: TemplateRef<unknown> | null) {
        this.templateViewContainer?.clear();

        this.popupActive = !!template;

        if (template) {
            this.templateViewContainer?.createEmbeddedView(template);
        }
    }

    @ViewChild('popup_template', {read: ViewContainerRef})
    private readonly templateViewContainer: ViewContainerRef | undefined;
}
