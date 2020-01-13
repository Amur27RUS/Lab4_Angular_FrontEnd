import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import {UrlPermission} from "../services/url-permission/url-permission.service";
import {MainComponent} from "../main/main.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UrlPermission]},
  { path: 'register', component: RegisterComponent, canActivate: [UrlPermission]},
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full', canActivate: [UrlPermission]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
