import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// eslint-disable-next-line import/no-unresolved
import AppRoutingModule from './app-routing.module';
// eslint-disable-next-line import/no-unresolved
import AppComponent from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export default class AppModule {}
