import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
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

    openPopup(_template: TemplateRef<{$implicit: string}>) {
        // this.popupService.openPopup(template, context);
    }

    closePopup() {
        // this.popupService.closePopup();
    }
}
