import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {SidenavComponent} from './sidenav.component';

@NgModule({
    declarations: [SidenavComponent],
    imports: [MatSidenavModule, MatButtonModule],
    exports: [SidenavComponent],
})
export class SidenavModule {}
