import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { FcmService } from './services/fcm/fcm.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import * as all from 'ionicons/icons';

register()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {
  constructor(private platform: Platform,
    private router: Router,
    private fcm: FcmService) {
    this.platform.ready().then(() => {
      document.body.classList.remove('dark');

      this.fcm.initPush().then();
    }).catch((e: any) => {
      console.log(e);
    })

    addIcons(all);
  }

  navigate(url: any) {
    this.router.navigate([url])
  }

  navigateTo(){

  }

  logout(){

  }
}
