import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    isOpen = false;

    @Input() set template(templateRef: TemplateRef<unknown> | null) {
        this.viewPortContainer?.clear();
        this.isOpen = !!templateRef;

        if (!templateRef) {
            return;
        }

        this.viewPortContainer?.createEmbeddedView(templateRef);
    }

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewPortContainer: ViewContainerRef | undefined;
}
