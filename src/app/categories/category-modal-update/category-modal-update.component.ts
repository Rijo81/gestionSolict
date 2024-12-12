import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonButton, IonToolbar, IonTitle, IonButtons, IonContent, IonItem, IonLabel, IonText } from "@ionic/angular/standalone";
import { CategoriesI } from 'src/app/models/category.models';

@Component({
  selector: 'app-category-modal-update',
  templateUrl: './category-modal-update.component.html',
  styleUrls: ['./category-modal-update.component.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonItem, IonContent, IonButtons, IonTitle, IonToolbar,
    IonButton, IonHeader, CommonModule, FormsModule]
})
export class CategoryModalUpdateComponent  implements OnInit {

  @Input() category: CategoriesI[] = []; // Categoría a actualizar

  updateCategoryForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) {
    this.updateCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      parentcategory: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // Inicializar el formulario con los datos de la categoría
    if (this.category) {
      this.updateCategoryForm.patchValue(this.category);
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  updateCategory() {
    if (this.updateCategoryForm.valid) {
      // Enviar los datos actualizados al padre
      this.modalController.dismiss(this.updateCategoryForm.value);
    }
  }

}
