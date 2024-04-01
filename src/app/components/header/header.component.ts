import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input() applicationConfig: ApplicationConfig | null = null;

    @Output() readonly menuClick = new EventEmitter<void>();

    constructor(private readonly popupService: PopupService) {}

    onMenuClick(event: MouseEvent) {
        event.stopPropagation();

        this.menuClick.emit();
    }

    openPopup(template: TemplateRef<{$implicit: string | undefined}>) {
        this.popupService.openPopup({
            template,
            context: {$implicit: this.applicationConfig?.title},
        });
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
