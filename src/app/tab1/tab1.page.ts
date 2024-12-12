/// <reference types="@types/google.maps" />

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement> | any
  newMap: GoogleMap | any

  IsDriver = false
  isLoading = false
  isClosePopoverOpen = false

  userProfile?: string;
  user: any;
  presentingElement: any = null;


  constructor(
    private router: Router,
    private userService: UserService

  ) { }
  // Typically referenced to your ion-router-outlet
  @ViewChild('popover') popover: any;

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.IsDriver = localStorage.getItem("userType") == "driver"

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

}
