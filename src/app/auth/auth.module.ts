import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {FormsModule} from "@angular/forms";
import {UrlPermission} from "../services/url-permission/url-permission.service";

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  providers: [UrlPermission],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
