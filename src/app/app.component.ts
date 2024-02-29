import {Component} from '@angular/core';
import {applicationConfigMock} from './shared/application-config/application-config.mock';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    readonly title = 'Angular-learnjs-150224';
    readonly applicationConfigMock = applicationConfigMock;

    isSidenavOpenedParent = false;

    toggleParentIsSidenavOpened() {
        this.isSidenavOpenedParent = !this.isSidenavOpenedParent;
    }
}
