import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    isOpen = false;

    @Input() set template(template: TemplateRef<unknown> | null) {
        this.getPopup(template);
    }

    @ViewChild('popup', {read: ViewContainerRef, static: true})
    private readonly popupViewContainer: ViewContainerRef | undefined;

    private getPopup(template: TemplateRef<unknown> | null) {
        this.popupViewContainer?.clear();

        if (!template) {
            this.isOpen = false;

            return;
        }

        this.isOpen = true;
        this.popupViewContainer?.createEmbeddedView(template);
    }
}
