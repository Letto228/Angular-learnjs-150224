import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    // eslint-disable-next-line @typescript-eslint/prefer-readonly
    @ViewChild(MatDrawer)
    private drawer: MatDrawer | undefined;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    toggle() {
        this.drawer?.toggle();

        this.changeDetectorRef.markForCheck();
    }
}
