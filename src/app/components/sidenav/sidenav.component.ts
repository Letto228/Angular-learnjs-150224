import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
    @Input() isSidenavOpened = false;

    @Output() readonly isSidenavOpenedChange = new EventEmitter<boolean>();

    toggleIsSidenavOpened() {
        // this.isSidenavOpened = !this.isSidenavOpened;
        this.isSidenavOpenedChange.emit(!this.isSidenavOpened);
    }
}
