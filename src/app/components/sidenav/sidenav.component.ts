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
    /* eslint-disable @typescript-eslint/prefer-readonly */

    @ViewChild(MatDrawer)
    private drawer: MatDrawer | undefined;

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private viewportContainer: ViewContainerRef | undefined;

    @ContentChild('navigationTemplate', {static: true})
    private navigationTemplate: TemplateRef<unknown> | undefined;

    /* eslint-enable @typescript-eslint/prefer-readonly */

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
        console.log('sidenav', this.navigationTemplate)
        this.viewportContainer?.createEmbeddedView(this.navigationTemplate);
    }
}
