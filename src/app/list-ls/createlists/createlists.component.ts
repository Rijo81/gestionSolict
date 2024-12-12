import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonHeader, IonButtons, IonBackButton, IonContent, IonList, IonItem, IonInput, IonButton, IonTitle, IonToolbar, IonLabel } from "@ionic/angular/standalone";
import { ListI } from 'src/app/models/list.models';
import { ListService } from 'src/app/services/list/list.service';

@Component({
  selector: 'app-createlists',
  standalone: true,
  imports: [ IonButton, IonInput, IonItem, IonList, IonContent, IonBackButton, IonButtons, IonHeader, FormsModule],
  templateUrl: './createlists.component.html',
  styleUrls: ['./createlists.component.scss'],
})
export class CreatelistsComponent {

  lists: ListI[] = [];
  data: string= '';
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private listService: ListService
  ) { }

  async addList(){
    console.log('adding state');
    if (this.data !== '') {
      const newList: ListI = {
        id: '',
        name: this.data,
      };
      await this.listService.createList(newList);
      this.loadLists();

      const alert = await this.alertCtrl.create({
        header: 'Crear Lista',
        subHeader: 'Su lista fue creado con exito',
        buttons: [
          {
            text: 'Aceptar',
            handler: async () => {
              this.router.navigate(['/segments']);
            },
          },
        ],
      });
      await alert.present();
    }
  }

  async loadLists() {
    this.lists = await this.listService.getList();
    console.log(this.lists);

  }

}
