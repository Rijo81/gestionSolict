import { Component, ViewChild } from '@angular/core';
import { AlertController, ItemReorderEventDetail, ModalController } from '@ionic/angular';
import { CategoriesI } from 'src/app/models/category.models';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { IonToolbar, IonFabButton, IonBackButton, IonButtons, IonTitle, IonContent, IonHeader,
  IonLabel, IonAvatar, IonPopover, IonList, IonReorderGroup, IonItem, IonIcon, IonFab } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { CategoryModalUpdateComponent } from '../category-modal-update/category-modal-update.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
  standalone: true,
  imports: [IonFab, IonIcon, IonItem, IonReorderGroup, IonList, IonPopover,
    IonAvatar, IonLabel, IonHeader, IonContent, IonTitle, IonButtons, IonBackButton,
    IonFabButton, IonToolbar, CommonModule ]
})
export class ListCategoriesComponent{
  isLoading = false
  isClosePopoverOpen = false

  userProfile?: string;
  user: any;
  presentingElement: any = null;
  categories: CategoriesI[] = [];

  constructor(private categoriesService: CategoriesService,
    private alertCtrl: AlertController,
    private userService: UserService,
    private router: Router,
    private modalCtrl: ModalController) {
      this.loadCategories();

  }
  @ViewChild('popover') popover: any;
  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');

    this.userProfile = this.userService.userProfileImage
    this.user = this.userService.user
    this.loadCategories();
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
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
  async loadCategories() {
    this.categories = await this.categoriesService.getCategories();
    console.log('viendo: ', this.categories);

  }

  async openCreateCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: { parentcategories: this.categories },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Nueva Categoría:', result.data);

        // Aquí puedes manejar la lógica para guardar la categoría
        const newCategoryChild: CategoriesI = {
                        id: '',
                        name: result.data.name,
                        description: result.data.description,
                        parentcategory: result.data.parentcategory,
        };
          this.categoriesService.createCategory(newCategoryChild);

      }
    });
    this.loadCategories();
    await modal.present();
  }

  async openUpdateModal(category: any) {
    const modal = await this.modalCtrl.create({
      component: CategoryModalUpdateComponent,
      componentProps: { category },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        // Aquí puedes actualizar la categoría en tu lista o enviarla al backend
        console.log('Categoría actualizada:', result.data);
        const updateCategory = {
                  ...category,
                  name: result.data.name,
                  description: result.data.description,
                  parentcategory: result.data.parentcategory };
                this.categoriesService.editCategory(category.id, updateCategory);
                console.log(result.data.id);
                this.loadCategories();

      }
    });

    return await modal.present();
  }

  updateCategory(category: CategoriesI){

  }
  // async updateCategory(category: CategoriesI) {
  //   const modal = await this.modalCtrl.create({
  //     component: CategoryModalComponent,
  //     componentProps: { parentcategories: this.categories, category },
  //   });

  //   modal.onDidDismiss().then((result) => {
  //     if (result.data) {
  //       console.log('Nueva Categoría:', result.data);
  //       // Aquí puedes manejar la lógica para guardar la categoría
  //       const updateCategory = {
  //         ...category,
  //         name: result.data.name,
  //         description: result.data.description,
  //         parentcategory: result.data.parentcategory };
  //       this.categoriesService.editCategory(category.id, updateCategory);
  //       console.log(result.data.id);
  //       this.loadCategories();
  //     }
  //   });
  //   await modal.present();
  // }
  // async updateCategory(category: CategoriesI){
  //   const alert = await this.alertCtrl.create({
  //     header: 'Editar Categoria',
  //     inputs: [
  //       { name: 'name',
  //         type: 'text',
  //         placeholder: 'Nombre de la Categoria',
  //         value: category.name },
  //       { name: 'description',
  //           type: 'text',
  //           placeholder: 'Descripcion de la Categoria',
  //           value: category.description },
  //       { name: 'parentsCategory',
  //             type: 'text',
  //             placeholder: 'Agregar Categoria Padre',
  //             value: category.parentcategory },
  //     ],
  //     buttons: [
  //       { text: 'Cancelar',
  //         role: 'cancel' },
  //       {
  //         text: 'Actualizar',
  //           handler: async (data) => {
  //             const updateCategory = {
  //               ...category,
  //               name: data.name,
  //               description: data.description,
  //               parentcategory: data.parentcategory };
  //             await this.categoriesService.editCategory(category.id, updateCategory);
  //             console.log(data.id);
  //             this.loadCategories();
  //             //console.log(this.loadCategories());
  //         },
  //       },
  //     ],
  //   });
  //   await alert.present();
  // }

  async delCategoy(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Categoria',
      subHeader: 'Esta segurdo de eliminar la Categoria',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.categoriesService.deleteCategory(id);
            this.loadCategories();
          },
        },
      ],
    });
    await alert.present();
  }
}
