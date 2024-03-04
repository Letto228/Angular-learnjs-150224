import {
    Component,
    ContentChild,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
    // eslint-disable-next-line @typescript-eslint/prefer-readonly
    @ViewChild(MatDrawer)
    private drawer: MatDrawer | undefined;

    // eslint-disable-next-line @typescript-eslint/prefer-readonly
    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private viewportContainer: ViewContainerRef | undefined;

    // eslint-disable-next-line @typescript-eslint/prefer-readonly
    @ContentChild('navigationTemplate', {static: true})
    private navigationTemplate: TemplateRef<unknown> | undefined;

    ngOnInit(): void {
        this.insertNavigation();
    }

    toggle() {
        this.drawer?.toggle();
    }

    private insertNavigation() {
        if (!this.navigationTemplate) {
            return;
        }

        this.viewportContainer?.createEmbeddedView(this.navigationTemplate);
    }
}
