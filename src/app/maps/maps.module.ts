import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsRoutingModule } from './maps-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MapsComponent } from './maps.component';
import { MapsDriverComponent } from './maps-driver/maps-driver.component';

@NgModule({
  declarations: [
    MapsComponent,
    MapsDriverComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    IonicModule // Importa aquí el IonicModule para usar componentes de Ionic
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapsModule { }
