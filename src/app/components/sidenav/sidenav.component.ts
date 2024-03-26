import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {CategoriesStoreService} from '../../shared/categories/categories-store.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
    readonly categories$ = this.categoriesStoreService.categories$;

    // eslint-disable-next-line @typescript-eslint/prefer-readonly
    @ViewChild(MatDrawer, {static: true})
    private drawer: MatDrawer | undefined;

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly categoriesStoreService: CategoriesStoreService,
    ) {}

    ngOnInit() {
        this.categoriesStoreService.loadCategories();
    }

    toggle() {
        this.drawer?.toggle();

        this.changeDetectorRef.markForCheck();
    }
}
