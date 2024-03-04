import {Component, Input, ViewChild, TemplateRef, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    isTemplate = false;

    @Input() set template(templatePopup: TemplateRef<unknown> | null) {
        this.popupContainer?.clear();

        if (!templatePopup) {
            this.isTemplate = false;
            // this.popupContainer?.element.nativeElement.parentNode.classList.add('hide');

            return;
        }

        this.isTemplate = true;
        // this.popupContainer?.element.nativeElement.parentNode.classList.remove('hide');
        this.popupContainer?.createEmbeddedView(templatePopup);
    }

    @ViewChild('popup', {read: ViewContainerRef, static: true})
    private readonly popupContainer: ViewContainerRef | undefined;
}
