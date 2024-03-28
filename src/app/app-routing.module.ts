import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NotFoundModule} from './pages/not-found/not-found.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/products-list',
        pathMatch: 'full',
    },
    {
        path: 'products-list',
        loadChildren: () =>
            import('./pages/products-list/products-list.module').then(m => m.ProductsListModule),
    },
    {
        path: 'product/:productId',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
        // canActivate: [CanActivateGuardService], // OLD
        // canActivate: [(...args) => inject(CanActivateGuardService).canActivate(...args)], // NEW
        // canActivate: [canActivateGuard],
        // canDeactivate: [canDeactivateGuard],
        // canLoad: [],
        // canMatch: [canMatchGuard],
    },
    // {
    //     path: 'product/:productId',
    //     component: NotFoundComponent,
    // },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [
        // RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading}),
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
        NotFoundModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
