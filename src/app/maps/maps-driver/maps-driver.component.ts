/// <reference types="@types/google.maps" />

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-maps-driver',
  templateUrl: './maps-driver.component.html',
  styleUrls: ['./maps-driver.component.scss'],
})
export class MapsDriverComponent implements AfterViewInit {


  constructor(
    private router: Router,
  ) { }
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement> | any
  newMap: GoogleMap | any


  async ngAfterViewInit() {
    await this.createMap()
    const markers = [
      {
        title: 'T-Mobile Park',
        snippet: 'Stadium',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/535/535137.png',
        iconSize: {
          width: 35,
          height: 35
        },
        coordinate: {
          lat: 18.544208105427288,
          lng: -69.9022002927916,
        }
      }, {
        title: 'Yakima',
        snippet: 'City',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/535/535137.png',
        iconSize: {
          width: 35,
          height: 35
        },
        coordinate: {
          lat: 18.544208105427288,
          lng: -69.9022002927916,
        }
      }
    ];
    await this.newMap.addMarkers(markers);

  }

  navigate(name = "/tabs/tab1") {
    this.router.navigate([name])
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.GOOGLE_MAP_API_KEY,
      config: {
        center: {
          lat: 18.53748367128225,
          lng: -69.88691254676165,
        },
        zoom: 8,
      },
    });
  }

}
