import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {PopupService} from 'src/app/shared/popup/popup.service';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input() applicationConfig: ApplicationConfig | null = null;

    @Output() readonly menuClick = new EventEmitter<void>();

    onMenuClick(event: MouseEvent) {
        event.stopPropagation();

        this.menuClick.emit();
    }

    constructor(private readonly popupService: PopupService) {}
    openPopup(template: TemplateRef<{$implicit: string}>) {
        this.popupService.openPopup({
            template,
            context: {$implicit: this.applicationConfig?.title},
        });
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
