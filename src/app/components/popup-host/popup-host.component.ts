import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @Input() set template(templateRef: TemplateRef<unknown> | null) {
        this.updateView(templateRef);
    }

    @ViewChild('viewport', {read: ViewContainerRef})
    private readonly viewportContainer: ViewContainerRef | undefined;

    hideHost = true;

    private updateView(templateRef: TemplateRef<unknown> | null): void {
        this.viewportContainer?.clear();
        this.hideHost = !templateRef;

        if (templateRef) {
            this.viewportContainer?.createEmbeddedView(templateRef);
        }
    }
}
