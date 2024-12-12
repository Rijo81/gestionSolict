import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.services';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LoginComponent, // Componente no standalone
    RegisterComponent // Componente no standalone
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule, // Importa aquí el IonicModule para usar componentes de Ionic
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
