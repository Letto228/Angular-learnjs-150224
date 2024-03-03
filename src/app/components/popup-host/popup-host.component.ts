import {
    Component,
    ElementRef,
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
    @Input() set template(template: TemplateRef<any> | null) {
        this.viewportContainer?.clear();

        if (!template) {
            // да, костылями завоняло, но нормальных идей что-то сейчас не идет
            this.host.nativeElement.style.setProperty('display', 'none');

            return;
        }

        this.host.nativeElement.style.setProperty('display', 'block');
        this.viewportContainer?.createEmbeddedView(template);
    }

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewportContainer: ViewContainerRef | undefined;

    constructor(private readonly host: ElementRef) {}
}
