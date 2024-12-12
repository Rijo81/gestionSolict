import { Component, OnInit, ViewChild} from '@angular/core';
import { AlertController,  ItemReorderEventDetail } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ListService } from 'src/app/services/list/list.service';
import { ListI } from 'src/app/models/list.models';
import { IonList, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonHeader, IonLabel, IonAvatar, IonPopover, IonReorderGroup, IonItem, IonIcon, IonFab, IonFabButton } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonIcon, IonItem, IonReorderGroup, IonPopover, IonAvatar, IonLabel,
    IonHeader, IonContent, IonTitle, IonBackButton, IonButtons, IonToolbar, IonList,
  CommonModule ]
})
export class ListDetailsComponent  implements OnInit {

  isLoading = false
  isClosePopoverOpen = false

  userProfile?: string;
  user: any;
  presentingElement: any = null;

  lists: ListI[] = [];
  data: string = '';
  constructor(private listService: ListService,
    private alertCtrl: AlertController,
    private router: Router,
    private userService: UserService) {
    this.loadLists();
  }
  @ViewChild('popover') popover: any;
  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');

    this.userProfile = this.userService.userProfileImage
    this.user = this.userService.user
  }

  presentClosePopover(e: Event) {
    this.popover.event = e;
    this.isClosePopoverOpen = true;
  }
  navigate(url: any) {
    this.router.navigate([url])
  }

  async closeSession() {
    try {
      this.isClosePopoverOpen = false
      this.isLoading = true
      await this.userService.logout()
      this.router.navigateByUrl('/auth', { replaceUrl: true });
    } catch (error) {

    } finally {
      this.isLoading = false
    }
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }
  async loadLists() {
    this.lists = await this.listService.getList();
    console.log(this.lists);

  }
  async updateList(list: ListI) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Estado',
      inputs: [
        { name: 'name',
          type: 'text',
          placeholder: 'Nombre del estado',
          value: list.name },
      ],
      buttons: [
        { text: 'Cancelar',
          role: 'cancel' },
        {
          text: 'Actualizar',
            handler: async (data) => {
              const updatedList = { ...list, name: data.name };


              await this.listService.editList(list.id, updatedList);
              console.log(data.id);
              this.loadLists();
              console.log(this.loadLists);

          },
        },
      ],
    });
    await alert.present();
  }

  async delList(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Lista',
      subHeader: 'Esta segurdo de eliminar la lista',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.listService.deleteList(id);
            this.loadLists();
          },
        },
      ],
    });
    await alert.present();
  }
  async msg(){
    const alert = await this.alertCtrl.create({
      header: 'Crear Lista',
      inputs: [
        { name: 'name_list',
          type: 'text',
          placeholder: 'Nombre de la Lista'
         },
      ],
      buttons: [
        { text: 'Cancelar',
          role: 'cancel' },
        {
          text: 'Crear',
            handler: async (data) => {
              if (data.name_list !== '') {
                const newList: ListI = {
                  id: '',
                  name: data.name_list,
                };
                await this.listService.createList(newList);
                this.loadLists();
              }
          },
        },
      ],
    });
    await alert.present();
    console.log('FUniconnection');

  }

  async addLists(){
    const alert = await this.alertCtrl.create({
      header: 'Crear Lista',
      inputs: [
        { name: 'name_list',
          type: 'text',
          placeholder: 'Nombre de la Lista',
         },
      ],
      buttons: [
        { text: 'Cancelar',
          role: 'cancel' },
        {
          text: 'Crear',
            handler: async (data) => {
              if (data.name_list !== '') {
                const newList: ListI = {
                  id: '',
                  name: data.name_list,
                };
                await this.listService.createList(newList);
                this.loadLists();
              }
          },
        },
      ],
    });
    await alert.present();
    console.log('FUniconnection');

  }

}



