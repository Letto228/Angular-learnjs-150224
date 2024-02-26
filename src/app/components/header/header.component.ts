import {Component} from '@angular/core';
import {applicationConfigMock} from '../../shared/application-config/application-config.mock';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    readonly applicationConfig = applicationConfigMock;
}
