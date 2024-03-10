import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './app-popup-host.component.html',
    styleUrls: ['./app-popup-host.component.css'],
})
export class AppPopupHostComponent {
    @Input()
    set template(template: TemplateRef<ViewContainerRef> | null) {
        this.updateTemplate(template);
    }

    isTemplate: boolean | undefined;

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewportContainer: ViewContainerRef | undefined;

    private updateTemplate(template: TemplateRef<ViewContainerRef> | null) {
        this.isTemplate = !!template;
        this.viewportContainer?.clear();

        if (!template) {
            return;
        }

        this.viewportContainer?.createEmbeddedView(template);
    }
}
