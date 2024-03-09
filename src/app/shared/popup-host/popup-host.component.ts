import {
    Component,
    EmbeddedViewRef,
    Input,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @ViewChild('popupContainer', {read: ViewContainerRef}) popupContainer!: ViewContainerRef;

    // Текущее представление, отображаемое в поп-апе
    private currentViewRef: EmbeddedViewRef<any> | null = null;
    showModal = true;

    @Input()
    set template(template: TemplateRef<any> | null) {
        if (!this.popupContainer) {
            return;
        }

        if (this.currentViewRef) {
            this.popupContainer.clear();
            this.currentViewRef.destroy();
        }

        // Если пришло новое представление - вставляем его в поп-ап
        if (template) {
            this.currentViewRef = this.popupContainer.createEmbeddedView(template);
        }
    }
}
