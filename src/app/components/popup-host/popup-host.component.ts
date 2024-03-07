import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewportViewContainer!: ViewContainerRef;

    @Input()
    set template(value: TemplateRef<unknown> | null) {
        this.updatePopupContent(value);
    }

    get isViewportClear(): boolean {
        return !this.viewportViewContainer.length;
    }

    private updatePopupContent(templateRef: TemplateRef<unknown> | null) {
        this.viewportViewContainer.clear();

        if (templateRef) {
            this.viewportViewContainer.createEmbeddedView(templateRef);
        }
    }
}
