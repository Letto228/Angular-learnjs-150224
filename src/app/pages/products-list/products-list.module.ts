import {NgModule} from '@angular/core'
import {ProductsListComponent} from './products-list.component'
import {CommonModule} from '@angular/common'
import {CardComponent} from './card/card.component'
import {ProductsListRouting} from './products-list.routing'
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [ProductsListComponent, CardComponent],
  imports: [
    CommonModule,
    ProductsListRouting,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [],
})
export class ProductsListModule {}
