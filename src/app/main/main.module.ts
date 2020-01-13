import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history/history.component';
import { CheckPointsComponent } from './check-points/check-points.component';
import {MainRoutingModule} from "./main-routing.module";
import {FormsModule} from "@angular/forms";
import {MainComponent} from "./main.component";
import {UrlPermission} from "../services/url-permission/url-permission.service";

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ],
  providers: [UrlPermission],
  declarations: [MainComponent, HistoryComponent, CheckPointsComponent]
})
export class MainModule { }
