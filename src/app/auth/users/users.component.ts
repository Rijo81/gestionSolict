import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ItemReorderEventDetail } from '@ionic/angular';
import { IonButtons, IonToolbar, IonBackButton, IonTitle, IonContent, IonHeader,
  IonLabel, IonAvatar, IonPopover, IonList, IonReorderGroup, IonItem, IonIcon,
  IonFab, IonFabButton } from "@ionic/angular/standalone";
import { UsersI } from 'src/app/models/users.models';
import { UserService } from 'src/app/services/user/user.service';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonIcon, IonItem, IonReorderGroup, IonList, IonPopover,
    IonAvatar, IonLabel, IonHeader, IonContent, IonTitle, IonBackButton, IonToolbar, IonButtons,
  FormsModule, CommonModule ]
})
export class UsersComponent  implements OnInit {

  isLoading = false
  isClosePopoverOpen = false

  userProfile?: string;
  user: any;
  presentingElement: any = null;

  users: UsersI[] = [];
  data: string = '';
  iLogo: string = 'assets/logo.png';
  constructor(private usersListService: UsersService,
    private alertCtrl: AlertController,
    private router: Router,
    private userService: UserService) {
    this.loadUsers();
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
  async loadUsers() {
    this.users = await this.usersListService.getUsers();
    console.log(this.users);

  }
  async updateUser(user: UsersI) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Usuario',
      message: `<img src="${this.iLogo}" alt="logo" style="border-radius: 2px">`,
      inputs: [
        { name: 'name',
          type: 'text',
          placeholder: 'Nombre del Usuario',
          value: user.name },
        { name: 'name',
          type: 'text',
          placeholder: 'Nombre del Usuario',
          value: user.name },
        { name: 'name',
          type: 'text',
          placeholder: 'Nombre del Usuario',
          value: user.name },

      ],
      buttons: [
        { text: 'Cancelar',
          role: 'cancel' },
        {
          text: 'Actualizar',
            handler: async (data) => {
              const updateUser = { ...user, name: data.name };


              await this.usersListService.editUsers(user.id_user, updateUser);
              this.loadUsers();
              console.log(this.loadUsers());

          },
        },
      ],
    });
    await alert.present();
  }

  async delUser(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Usuario',
      subHeader: 'Esta segurdo de eliminar el Usuario',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.usersListService.deleteUser(id);
            this.loadUsers();
          },
        },
      ],
    });
    await alert.present();
  }
  async addUser(){
    const alert = await this.alertCtrl.create({
      header: 'Crear Usuario',
      message: `<img src="${this.iLogo}" alt="logo" style="border-radius: 2px">`,
      inputs: [
        { name: 'name',
          type: 'text',
          placeholder: 'Nombre completo',
         },
         { name: 'email',
          type: 'text',
          placeholder: 'Correo Electronico',
         },
         { name: 'password',
          type: 'text',
          placeholder: 'Contraseña',
         },
      ],
      buttons: [
        { text: 'Cancelar',
          role: 'cancel' },
        {
          text: 'Crear',
            handler: async (data) => {
              if (data.name_list !== '') {
                const newUser: UsersI = {
                  id_user: '',
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  // image_profile: '',
                  // token: '',
                  // date_created: '',
                };
                await this.usersListService.createUsers(newUser);
                this.loadUsers();
              }
          },
        },
      ],
    });
    await alert.present();
    console.log('FUniconnection');

  }
}
