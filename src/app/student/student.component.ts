import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { StudentModel, StudentRequestModel } from '../models/odoo.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {

  constructor(
    private router: Router,
    private actionSheetCtrl: ActionSheetController
  ) { }

  currentValue = 'javascript';

  student: StudentRequestModel = {};
  age = 1
  years = Array.from({ length: 100 }, (_, i) => i + 1);
  avatarImage: any = "https://ionicframework.com/docs/img/demos/avatar.svg"
  public loaded = false;
  public showLocation = false
  public latitude: any = null
  public longitude: any = null
  onIonChange(event: CustomEvent) {
    this.age = event.detail.value;
  }

  onDidDismiss(event: CustomEvent) {
    console.log('didDismiss', JSON.stringify(event.detail));
  }




  navigate(url = "auth/register") {
    this.router.navigate([url])
  }

  getCurrentPosition = async () => {
    this.showLocation = true

    const coordinates = await Geolocation.getCurrentPosition();
    setTimeout(() => {
      this.loaded = true
    }, 2000)
    this.latitude = coordinates.coords.latitude
    this.longitude = coordinates.coords.longitude
    console.log('Current position:', coordinates);
  };

  async selectImageSource() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccionar origen de imagen',
      buttons: [
        {
          text: 'Cámara',
          icon: 'camera',
          handler: () => {
            this.openCamera(CameraSource.Camera);
          }
        },
        {
          text: 'Galería',
          icon: 'images',
          handler: () => {
            this.openCamera(CameraSource.Photos);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openCamera(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Cambia a DataUrl para obtener una URL directa de la imagen
        source: source  // Usa la cámara o la galería
      });

      this.avatarImage = image.dataUrl;

      // La imagen está disponible en formato Base64
      const imageUrl = `data:image/jpeg;base64,${image.base64String}`;
      console.log('Imagen obtenida:', imageUrl);
      // Aquí puedes hacer lo que necesites con la imagen (mostrarla, guardarla, etc.)
    } catch (error) {
      console.error('Error obteniendo la imagen', error);
    }
  }
}
