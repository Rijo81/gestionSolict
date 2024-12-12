import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsComponent } from './maps.component';
import { MapsDriverComponent } from './maps-driver/maps-driver.component';

const routes: Routes = [
    {
      path: "",
      component: MapsComponent
    },
    {
      path: "driver",
      component: MapsDriverComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
