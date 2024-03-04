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

    // // eslint-disable-next-line @typescript-eslint/prefer-readonly
    // @ViewChild('viewport', {read: ViewContainerRef, static: true})
    // private viewportContainer: ViewContainerRef | undefined;

    // // eslint-disable-next-line @typescript-eslint/prefer-readonly
    // @ContentChild('navigationTemplate', {static: true})
    // private navigationTemplate: TemplateRef<unknown> | undefined;

    // ngOnInit(): void {
    //     this.insertNavigation();
    // }

    // constructor() {
    //     setTimeout(() => {
    //         this.navigationSelect = 'test';
    //     }, 4000);
    // }

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    toggle() {
        this.drawer?.toggle();

        this.changeDetectorRef.markForCheck();
    }

    // navigationSelect = 'navigation';

    // private insertNavigation() {
    //     if (!this.navigationTemplate) {
    //         return;
    //     }

    //     this.viewportContainer?.createEmbeddedView(this.navigationTemplate);
    // }

    // opened = false;

    // ngAfterViewInit(): void {
    //     this.opened = true;
    // }
}
