import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {SidenavComponent} from './sidenav.component';
import {CategoriesSelectModule} from './categories-select/categories-select.module';

@NgModule({
    declarations: [SidenavComponent],
    imports: [CommonModule, MatSidenavModule, MatButtonModule, CategoriesSelectModule],
    exports: [SidenavComponent],
})
export class SidenavModule {}
