import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    isActive = false;

    @Input() set template(template: TemplateRef<unknown> | null) {
        this.viewPortContainer?.clear();
        this.isActive = !!template;

        if (!template) {
            return;
        }

        this.viewPortContainer?.createEmbeddedView(template);
    }

    // eslint-disable-next-line @typescript-eslint/prefer-readonly
    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private viewPortContainer: ViewContainerRef | undefined;
}
