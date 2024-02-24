import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HeaderComponent} from './header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
    exports: [HeaderComponent],
})
export class HeaderModule {}
