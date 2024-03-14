import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    get isTemplateEmpty(): boolean {
        return !this.viewportContainer?.length;
    }

    @Input() set template(templateRef: TemplateRef<unknown> | null) {
        this.updateTemplate(templateRef);
    }

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewportContainer: ViewContainerRef | undefined;

    private updateTemplate(templateRef: TemplateRef<unknown> | null): void {
        this.viewportContainer?.clear();

        if (templateRef) {
            this.viewportContainer?.createEmbeddedView(templateRef);
        }
    }
}
