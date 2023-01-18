import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListComponent } from './components/list/list.component';
import { UsersComponent } from './users.component';
import { IsAuthenticatedGuard } from '../core/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'create',
        component: CreateUserComponent
      },
      {
        path: 'edit/:id',
        component: CreateUserComponent,
        canActivate: [IsAuthenticatedGuard]
      },
      {
        path: '',
        component: ListComponent,
        canActivate: [IsAuthenticatedGuard]
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
  exports: [RouterModule]
})
export class UsersRoutingModule { }
