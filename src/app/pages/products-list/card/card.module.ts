import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CardComponent} from './card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [CommonModule, MatButtonModule, MatCardModule],
    exports: [CardComponent],
})
export class CardModule {}
