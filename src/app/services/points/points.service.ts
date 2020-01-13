import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppComponent} from '../../app.component';
import {Point} from '../../model/point';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class PointsService {

  public points: BehaviorSubject<Point[]> = new BehaviorSubject<Point[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem('authToken');

    const headers = new HttpHeaders().set('Authorization', 'Basic ' + token);

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return headers;
  }

  public getPointsRecalculated(r): Observable<any> {
    return this.http.get(AppComponent.API_URL + '/points/recalculate?r=' + r, { headers: this.getHeaders()});
  }

  public getPoints() {
    this.http.get(AppComponent.API_URL + '/points', { headers: this.getHeaders()}).subscribe(data => {
      this.points.next(data as Point[]);
    }, (err: HttpErrorResponse) => {
      if (err.status == 401 || err.status == 403 )
        this.authService.logOut();
    });
  }

  public addPoint(point: Point) {
    const body = {x: point.x, y: point.y, r: point.r};
    return this.http.post(AppComponent.API_URL + '/points', body, { headers: this.getHeaders()}).toPromise();
  }

}
