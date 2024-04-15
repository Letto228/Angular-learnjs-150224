import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {
    PopupService,
    TPopupContext,
    TPopupTemplate,
    TTemplateRef,
} from 'src/app/shared/pop-up/pop-up.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    popupTemplate: TPopupTemplate | null = null;
    popupContext: TPopupContext | null = null;

    get isViewportClear(): boolean {
        return !this.popupTemplate;
    }

    constructor(
        private readonly popupService: PopupService,
        private readonly cdn: ChangeDetectorRef,
    ) {
        this.popupService.popUpTemplate$.subscribe((template: TTemplateRef | null) => {
            this.updatePopupContent(template);
        });
    }

    private updatePopupContent(template: TTemplateRef | null) {
        this.popupContext = null;
        this.popupTemplate = null;

        if (template) {
            this.popupContext = template.contextRef;
            this.popupTemplate = template.templateRef;
        }

        this.cdn.markForCheck();
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
