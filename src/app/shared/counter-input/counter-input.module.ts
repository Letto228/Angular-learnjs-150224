import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CounterInputComponent} from './counter-input.component';

@NgModule({
    declarations: [CounterInputComponent],
    imports: [CommonModule, MatIconModule, MatButtonModule],
    exports: [CounterInputComponent],
})
export class CounterInputModule {}
