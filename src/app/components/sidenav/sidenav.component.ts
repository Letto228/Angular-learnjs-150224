import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
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
    @Input() isSidenavOpened = false;
    // @Input() navigationTemplate: TemplateRef<unknown> | null = null;
    // @Input() set navigationTemplate(template: TemplateRef<unknown>) {
    //     this.viewportContainer?.clear();
    //     this.viewportContainer?.createEmbeddedView(template);
    //     // const view = this.viewportContainer?.createEmbeddedView(template);

    //     // console.log(view?.destroy());

    //     // this.viewportContainer?.clear();

    //     // this.viewportContainer?.createEmbeddedView(template);
    //     // this.viewportContainer?.createEmbeddedView(template);
    //     // setInterval(() => {
    //     //     this.viewportContainer?.createEmbeddedView(template);
    //     // }, 2000);
    // }

    @Output() readonly isSidenavOpenedChange = new EventEmitter<boolean>();

    ngOnInit(): void {
        this.insertNavigation();
    }

    /* eslint-disable @typescript-eslint/prefer-readonly */
    // @ViewChild('drawer')
    @ViewChild(MatDrawer)
    private drawer: MatDrawer | undefined;

    // @ViewChild(MatDrawer, {read: ElementRef})
    // private set drawerElement(elementRef: ElementRef | undefined) {
    //     console.log(elementRef?.nativeElement);
    // };

    // @ViewChild(MatDrawer, {read: ViewContainerRef})
    // private drawerViewContainer: ViewContainerRef | undefined;

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private viewportContainer: ViewContainerRef | undefined;

    @ContentChild('p', {read: ElementRef, descendants: false})
    private set checkContent(elementRef: ElementRef | undefined) {
        // eslint-disable-next-line no-console
        console.log(elementRef);
    }

    @ContentChild('navigationTemplate', {static: true})
    private navigationTemplate: TemplateRef<unknown> | undefined;
    /* eslint-enable @typescript-eslint/prefer-readonly */

    // constructor() {
    //     console.log(this.drawer);
    // }

    // toggleIsSidenavOpened() {
    //     this.isSidenavOpenedChange.emit(!this.isSidenavOpened);
    // }

    toggle() {
        // drawer.toggle()

        // console.log(this.drawer, this.drawerElement, this.drawerViewContainer);

        this.drawer?.toggle();
    }

    private insertNavigation() {
        if (!this.navigationTemplate) {
            return;
        }

        this.viewportContainer?.createEmbeddedView(this.navigationTemplate);
    }
}
