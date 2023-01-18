import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { IsAuthenticatedGuard } from '../core/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: 'create',
        component: ProductCreateComponent
      },
      {
        path: 'edit/:id',
        component: ProductCreateComponent
      },
      {
        path: '',
        component: ProductsListComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }
