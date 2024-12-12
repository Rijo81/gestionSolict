import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatelistsComponent } from './createlists/createlists.component';
import { ListDetailsComponent } from './list-details/list-details.component';

const routes: Routes = [
  {
    path: '',
    component: CreatelistsComponent,
  },
  {
    path: 'list-details',
    component: ListDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListLsRoutingModule { }
