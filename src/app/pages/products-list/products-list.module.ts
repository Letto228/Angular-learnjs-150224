import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {CardComponent} from './card/card.component';
import {ProductsListComponent} from './products-list.component';

@NgModule({
    declarations: [ProductsListComponent, CardComponent],
    imports: [CommonModule, MatCardModule, MatGridListModule, MatButtonModule],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
