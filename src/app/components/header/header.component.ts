import {Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    // readonly applicationConfig = applicationConfigMock;
    // readonly logoWidthInPx = 100;

    // @Input() applicationConfig: ApplicationConfig | null = null;
    // @Input() applicationConfig!: ApplicationConfig;
    // @Input() applicationConfig?: ApplicationConfig;
    @Input() applicationConfig: ApplicationConfig | undefined;
    // applicationConfig = undefined;

    // @Output() menuClick = new EventEmitter<MouseEvent>();
    // @Output() menuClick = new EventEmitter<string>();
    // @Output() menuClick = new EventEmitter<void>();
    @Output() readonly menuClick = new Subject<void>();

    onMenuClick(event: MouseEvent) {
        event.stopPropagation();

        this.menuClick.next();

        // eslint-disable-next-line no-console
        console.log('Menu click');
    }

    onToolbarClick() {
        // eslint-disable-next-line no-console
        console.log('Toolbar click');
    }
}
