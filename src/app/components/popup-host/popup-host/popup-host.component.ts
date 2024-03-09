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

        if (template !== null) {
            this.popupActive = true;
            this.templateViewContainer?.createEmbeddedView(template);
        }

        if (template === null) {
            this.popupActive = false;
        }
    }

    @ViewChild('popup_template', {read: ViewContainerRef, static: false})
    private readonly templateViewContainer: ViewContainerRef | undefined;
}
