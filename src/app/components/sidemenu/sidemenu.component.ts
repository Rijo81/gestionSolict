import { Component } from '@angular/core';
import {  MenuController, IonMenuToggle, IonLabel, IonItem, IonIcon, IonRouterLink } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuI } from 'src/app/models/menu.models';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  standalone: true,
  imports: [IonIcon, IonItem, IonLabel, IonMenuToggle, RouterModule, IonRouterLink, CommonModule]
})
export class SidemenuComponent {

  menu: MenuI [];
  constructor(private menuController: MenuController) {
    this.initMenu();

  }

  initMenu(){
    this.menu = [
      {name: 'Inicio', enlace: '/segments', icon: 'home'},
      {name: 'Estados', enlace: '/state/list-state', icon: 'list'},
      {name: 'Categorias', enlace: '/list-categories', icon: 'duplicate'},
      {name: 'Tipos de Solicitudes', enlace: '/', icon: 'keypad-outline'},
      {name: 'Usuarios', enlace: '/auth/users', icon: 'people-circle-outline'},
    ];
  }

  async closeMenu(){

  }

}
