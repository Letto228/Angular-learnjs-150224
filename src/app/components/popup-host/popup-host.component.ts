import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    isOpen = false;

    @Input('template') set template(templateRef: TemplateRef<unknown> | null) {
        this.viewPortContainer?.clear();

        if (!templateRef) {
            this.isOpen = false;
            return;
        }

        this.viewPortContainer?.createEmbeddedView(templateRef);
        this.isOpen = true;
    }

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private viewPortContainer: ViewContainerRef | undefined;
}
