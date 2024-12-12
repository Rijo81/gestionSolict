import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FileModel } from 'src/app/models/odoo.model';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit {

  @Input() productFiles?: Array<FileModel>;
  @Input() additionalTexts: Array<string> = [];
  @Input() showHeader = true;
  constructor(private modalCtrl: ModalController) {

  }
  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit(): void {
    console.log("object");
  }




}
