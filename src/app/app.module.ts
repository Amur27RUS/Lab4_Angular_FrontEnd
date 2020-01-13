import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { AuthService } from "./services/auth/auth.service";
import { PointsService } from "./services/points/points.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { routing } from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    AuthModule,
    MainModule
  ],
  providers: [AuthService, PointsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
