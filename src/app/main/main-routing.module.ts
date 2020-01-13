import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main.component";
import {UrlPermission} from "../services/url-permission/url-permission.service";

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [UrlPermission] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
