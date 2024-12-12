import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PickerModel } from 'src/app/models/picker.model';

@Component({
  selector: 'app-modal-picker',
  templateUrl: './modal-picker.component.html',
  styleUrls: ['./modal-picker.component.scss'],
})
export class ModalPickerComponent {

  @Input() data!: Array<PickerModel>;
  @Input() title!: string;
  @Input() length?: number;
  @Input() multiple: boolean = false;

  selectedOptions = new Set<PickerModel>();
  currentOption?: PickerModel;

  constructor(private modalCtrl: ModalController, private alertContrl: AlertController) {
  }

  async cancel() {
    await this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    if (!this.selectedOptions || this.selectedOptions.size == 0) {
      const alert = await this.alertContrl.create({
        header: `Favor Seleccionar (${this.title})`,
        message: `Aun no ha seleccionado (${this.title})`,
        buttons: ["Ok"],
      });

      await alert.present();
      return;
    }

    const value = this.multiple ? [...this.selectedOptions] : this.selectedOptions.values().next().value
    await this.modalCtrl.dismiss(value, 'confirm');
  }

  onIonChange(event: CustomEvent) {

    this.currentOption = event.detail.value
    if (!this.multiple && this.currentOption) {
      this.selectedOptions.clear()
      this.selectedOptions.add(this.currentOption)
    }
  }
  async addOption() {
    if (this.length && this.selectedOptions.size >= this.length) {
      const alert = await this.alertContrl.create({
        header: `Cantidad Maxima de (${this.title}) superada`,
        message: `La cantidad de (${this.title}) debe ser ${this.length}, remueva una de las opciones en rojo para poder continuar agregando otra opcion`,
        buttons: ["Ok"],
      });

      await alert.present();
      return
    }
    if (this.currentOption) this.selectedOptions.add(this.currentOption);
  }

  removeOption(option: PickerModel) {
    this.selectedOptions.delete(option)
  }
}
