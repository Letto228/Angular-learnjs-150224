import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {ProductsListModule} from './pages/products-list/products-list.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {PopupHostModule} from './components/popup-host/popup-host.module';
import {InsertShadowModule} from './shared/insert-shadow/insert-shadow.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderModule,
        ProductsListModule,
        SidenavModule,
        MatListModule,
        PopupHostModule,
        InsertShadowModule,
    ],
    providers: [
        // {
        //     provide: ProductsStoreService, // token
        //     useClass: ProductsStoreService,
        // },
        // ProductsStoreService,
        // ProductsApiService,
        // {
        //     provide: 'UserName',
        //     useValue: 'Egor Sidorov',
        // },
        // {
        //     provide: 'ProductsStoreService',
        //     useExisting: ProductsStoreService,
        //     // useClass: ProductsStoreService,
        // },
        // {
        //     provide: 'ProductsStoreService',
        //     useValue: ProductsStoreService,
        // },
        // {
        //     provide: 'factory',
        //     useFactory: () => new ProductsStoreService(),
        // },
        // {
        //     provide: 'factory',
        //     useFactory: (productsStoreService: ProductsStoreService) => productsStoreService,
        //     deps: [ProductsStoreService],
        // },
        // {
        //     provide: 'factory',
        //     useFactory: () => inject(ProductsStoreService),
        // },
        // {
        //     provide: 'factory',
        //     useFactory: () => 'Egor Sidorov',
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
