import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCameraPickerComponent } from './modal-camera-picker.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ModalCameraPickerComponent],
  exports: [ModalCameraPickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ModalCameraPickerModule { }
