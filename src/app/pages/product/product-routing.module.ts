import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {DescriptionComponent} from './description/description.component';
import {DescriptionModule} from './description/description.module';
import {TypeComponent} from './type/type.component';
import {TypeModule} from './type/type.module';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        // canActivateChild: [],
        children: [
            {
                path: '',
                redirectTo: 'description',
                pathMatch: 'full',
                // canActivate: [],
            },
            {
                path: 'description',
                component: DescriptionComponent,
                // canActivate: [],
            },
            {
                path: 'type',
                component: TypeComponent,
                // canActivate: [],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), DescriptionModule, TypeModule],
    exports: [RouterModule],
})
export class ProductRouting {}
