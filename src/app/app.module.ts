import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {CardModule} from './pages/products-list/card/card.module';

// @NgModule({
//     declarations: [HeaderComponent],
//     exports: [HeaderComponent],
// })
// export class HeaderModule {}

// declarations ~ const ...
// exports ~ module.export = {...}
// imports ~ import {...} from 'module';

@NgModule({
    declarations: [AppComponent], // const ...
    // exports: [AppComponent], // module.export = {...}
    // imports: [HeaderModule], // import {...} from 'module';
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HeaderModule, CardModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
