import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    interpolation: ['{{', '}}'],
})
export class AppComponent {
    title = 'Angular-learnjs-150224';
}
