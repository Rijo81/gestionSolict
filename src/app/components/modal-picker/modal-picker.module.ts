import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPickerComponent } from './modal-picker.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ModalPickerComponent],
  exports: [ModalPickerComponent]
})
export class ModalPickerComponentModule { }
