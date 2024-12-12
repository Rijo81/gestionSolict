import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { IonicModule } from '@ionic/angular';
import { StudentComponent } from './student.component';
import { FormsModule } from '@angular/forms';
import { ListStudentsComponent } from './list-students/list-students.component';


@NgModule({
  declarations: [
    StudentComponent,
    ListStudentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StudentRoutingModule,
    IonicModule // Importa aquí el IonicModule para usar componentes de Ionic

  ]
})
export class StudentModule { }
