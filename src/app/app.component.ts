import {Component, ViewEncapsulation} from '@angular/core';
import {applicationConfigMock} from './shared/application-config/application-config.mock';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    interpolation: ['{{', '}}'],
})
export class AppComponent {
    readonly title = 'Angular-learnjs-150224';
    readonly applicationConfigMock = applicationConfigMock;

    isSidenavOpenedParent = false;

    toggleParentIsSidenavOpened() {
        this.isSidenavOpenedParent = !this.isSidenavOpenedParent;
    }

    onInputSend(event: Event) {
        // eslint-disable-next-line no-console
        console.log(event);
    }

    onMenuClick() {
        // eslint-disable-next-line no-console
        console.log('Menu click in AppComponent');

        this.toggleParentIsSidenavOpened();
    }
}
