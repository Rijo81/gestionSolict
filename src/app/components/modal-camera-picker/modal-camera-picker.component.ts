// Documentation: https://ionicframework.com/docs/angular/your-first-app/adding-mobile
import { Component, Input } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';


import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { PhotoModel } from 'src/app/models/odoo.model';


@Component({
  selector: 'app-modal-camera-picker',
  templateUrl: './modal-camera-picker.component.html',
  styleUrls: ['./modal-camera-picker.component.scss'],
})
export class ModalCameraPickerComponent {
  private platform!: Platform;
  @Input() title!: string;
  @Input() maxLength?: number;

  public photos: Set<PhotoModel> = new Set<PhotoModel>();

  constructor(platform: Platform, private modalCtrl: ModalController, private alertContrl: AlertController) {
    this.platform = platform;
  }

  async cancel() {
    await this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {

    if (this.maxLength === 1) {
      const photo = this.photos.values().next().value
      if (photo) await this.modalCtrl.dismiss(photo, 'confirm');
      else throw new Error("No hay foto cargada")
    } else await this.modalCtrl.dismiss([...this.photos], 'confirm');

  }


  async addPhotoToGallery() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: this.platform.is('hybrid') ? CameraSource.Prompt : CameraSource.Photos,
        quality: 100,

      });
      console.log("______________ capturedPhoto");
      console.log(capturedPhoto);
      const photo = await this.getPhotoModel(capturedPhoto)
      this.photos.add(photo);

    } catch (ex) {
      const alert = await this.alertContrl.create({
        header: "Error obteniendo imagen",
        message: "No se pudo obtener la imagen, En caso de ser necesario habilitar permisos a la aplicacion e intentelo de nuevo",
        buttons: ["Ok"],
      });

      await alert.present();

    }
  }
  removePhoto(photo: PhotoModel) {
    this.photos.delete(photo)
  }
  private async getPhotoModel(photo: Photo): Promise<PhotoModel> {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    const base64 = await this.convertBlobToBase64(blob) as string;
    const fileName = Date.now() + '.jpeg';

    return {
      webviewPath: photo.webPath ?? '',
      base64,
      blob,
      fileName
    }
  }


  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
