import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {PopupService} from 'src/app/shared/pop-up/pop-up.service';
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

    constructor(private readonly popupService: PopupService) {}

    onMenuClick(event: MouseEvent) {
        event.stopPropagation();

        this.menuClick.emit();
    }

    openPopup(_template: TemplateRef<{$implicit: string}>) {
        const context = {
            $implicit: 'Товар 1',
        };

        this.popupService.openPopup(_template, context);
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
