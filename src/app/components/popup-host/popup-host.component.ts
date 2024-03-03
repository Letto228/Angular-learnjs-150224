import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    popupIsShow = false;

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly popupViewport!: ViewContainerRef;

    @Input() set template(template: TemplateRef<unknown> | null) {
        if (template === null) {
            this.popupViewport.clear();
            this.popupIsShow = false;

            return;
        }

        if (!this.popupIsShow) {
            this.popupIsShow = true;
        }

        this.popupViewport.clear();
        this.popupViewport.createEmbeddedView(template);
    }
}
