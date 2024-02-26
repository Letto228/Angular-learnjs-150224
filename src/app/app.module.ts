import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {RouterOutlet} from '@angular/router'
import {ProductsListModule} from './pages/products-list/products-list.module'
import {HeaderModule} from './components/header/header.module'

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    ProductsListModule,
    HeaderModule,
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
