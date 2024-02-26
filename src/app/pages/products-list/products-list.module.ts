import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ProductsListComponent} from './products-list.component';
import {CardComponent} from './card/card.component';

@NgModule({
    declarations: [ProductsListComponent, CardComponent],
    imports: [CommonModule, MatCardModule, MatButtonModule],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
