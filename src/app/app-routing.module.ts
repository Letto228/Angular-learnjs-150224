import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [
  // {
  //   path: 'products',
  //   component: ProductsListComponent,
  //   loadChildren: () =>
  //     import('./pages/products-list/products-list.module').then(
  //       (m) => m.ProductsListModule
  //     ),
  // },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products-list/products-list.module').then(
        (m) => m.ProductsListModule
      ),
  },
  {
    path: '',
    loadChildren: () => import('./app.module').then((m) => m.AppModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
