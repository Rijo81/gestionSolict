import { Component, OnInit } from '@angular/core';
import { IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonHeader, IonLabel, IonAvatar, IonPopover, IonList, IonReorderGroup, IonItem, IonIcon, IonFab, IonFabButton, IonCardSubtitle, IonCardHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss'],
  standalone: true,
  imports: [IonCardHeader, IonCardSubtitle, IonFabButton, IonFab, IonIcon, IonItem, IonReorderGroup, IonList, IonPopover, IonAvatar, IonLabel, IonHeader, IonContent, IonTitle, IonBackButton, IonButtons, IonToolbar, ]
})
export class ReceivedComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
