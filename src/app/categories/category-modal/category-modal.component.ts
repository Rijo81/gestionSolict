import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel,
  IonInput, IonFooter, IonSelectOption, IonSelect } from "@ionic/angular/standalone";

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  standalone: true,
  imports: [IonFooter, IonInput, IonLabel, IonItem, IonContent, IonButton, IonButtons, IonTitle,
    IonToolbar, IonHeader, IonSelectOption, IonSelect, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CategoryModalComponent  {

  @Input() parentcategories: { id: string; name: string; description: string, parentcategory: string }[] = []; // Recibe subcategorías del componente padre
  categoryName: string = '';
  categoryDescription: string = '';
  selectedSubcategory: string = '';

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  createCategory() {
    if (this.categoryName) {
      const newCategory = {
        name: this.categoryName,
        description: this.categoryDescription,
        parentcategory: this.selectedSubcategory,
      };
      this.modalCtrl.dismiss(newCategory); // Devuelve los datos al componente padre
    } else {
      alert('Completa todos los campos');
    }
  }
}
