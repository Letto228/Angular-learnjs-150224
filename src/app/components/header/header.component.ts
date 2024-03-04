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

    @Input() applicationConfig: ApplicationConfig | undefined;
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
