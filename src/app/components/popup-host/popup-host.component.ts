import {Component, Input, ViewChild, TemplateRef, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @Input() set template(templatePopup: TemplateRef<unknown> | null) {
        this.popupContainer?.clear();

        if (!templatePopup) {
            this.popupContainer?.element.nativeElement.parentNode.setAttribute(
                'class',
                'popup-host hide',
            );

            return;
        }

        this.popupContainer?.element.nativeElement.parentNode.setAttribute('class', 'popup-host');
        this.popupContainer?.createEmbeddedView(templatePopup);
    }

    @ViewChild('popup', {read: ViewContainerRef, static: true})
    private readonly popupContainer: ViewContainerRef | undefined;
}
