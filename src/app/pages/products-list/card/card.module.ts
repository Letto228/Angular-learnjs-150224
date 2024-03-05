import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CardComponent} from './card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
    exports: [CardComponent],
})
export class CardModule {}
