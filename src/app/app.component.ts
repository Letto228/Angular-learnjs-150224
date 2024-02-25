import {Component} from '@angular/core';

@Component({
    // selector: 'div#root',
    // selector: 'button[myButton]', - <button myButton>...</button>
    // selector: 'my-button', - <my-button><button>...</button></my-button>
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    // template: `<h1>Hello word</h1>`,
    // styles: [''],
    // encapsulation: ViewEncapsulation.None,
    // interpolation: ['{{', '}}'],
})
export class AppComponent {
    title = 'Angular-learnjs-150224';
}
