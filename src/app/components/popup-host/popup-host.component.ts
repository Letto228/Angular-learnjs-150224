import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    private templateRef: TemplateRef<unknown> | null = null;

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewportViewContainer!: ViewContainerRef;

    @Input()
    set template(value: TemplateRef<unknown> | null) {
        this.templateRef = value;
        this.updatePopupContent();
    }

    get isViewportClear(): boolean {
        return !this.viewportViewContainer.length;
    }

    private updatePopupContent() {
        this.viewportViewContainer.clear();

        if (this.templateRef) {
            this.viewportViewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
