import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { isNumeric } from 'rxjs/util/isNumeric';
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../services/auth/auth.service";
import {PointsService} from "../../services/points/points.service";
import {Point} from "../../model/point";
import {HistoryComponent} from "../history/history.component";
import {Graphic} from "../../model/graphic";

@Component({
  providers: [HistoryComponent],
  selector: 'app-check-points',
  templateUrl: './check-points.component.html',
  styleUrls: ['./check-points.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckPointsComponent implements OnInit {

  @ViewChild('canvas')
  canvas: ElementRef;

  point: Point = new Point(0, 0, 1, false);
  errorMessage:string;
  private rightX = ['-2','-1.5','-1','-0.5','0','0.5','1','1.5','2'];
  private rightR = ['-2','-1.5','-1','-0.5','0','0.5','1','1.5','2'];
  private graphic: Graphic;

  constructor(private service: PointsService, private authService: AuthService) {
  }

  ngOnInit() {
    this.point.x = -2;
    this.graphic = new Graphic(this.canvas);
    this.drawGraphic(1);
  }

  setR(value) {
    this.point.r = value;
  }

  setX(value) {
    this.point.x = value;
  }

  addPoint() {

    if (!isNumeric(this.point.y) || !(-3 < this.point.y && this.point.y < 3)) {
      this.error('Wrong Y');
      return false;
    } else if (!isNumeric(this.point.x) && !(this.rightX.includes(this.point.x))) {
      this.error('Wrong X');
      return false;
    } else if (!isNumeric(this.point.r) && !(this.rightR.includes(this.point.r))) {
      this.error('Wrong R');
      return false;
    }

    this.service.addPoint(this.point).then(data => {
      this.drawPoint(<Point>data);
      this.service.getPoints();
    }).catch((err: HttpErrorResponse) => {
      if (err.status == 401 || err.status == 403)
        this.authService.logOut();
    });
    return true;
  }

  getPointsRecalculated(r) {
    this.service.getPointsRecalculated(r).subscribe(data => (data as Point[]).forEach(p => this.drawPoint(p)),
      (err: HttpErrorResponse) => {
      if (err.status == 401 || err.status == 403 )
        this.authService.logOut();
    });
  }

  addPointFromCanvas(event) {

    let br = this.canvas.nativeElement.getBoundingClientRect();
    let left = br.left;
    let top = br.top;
    let i = 40;

    // let obj = event.target;
    // let x = Number(((event.pageX - window.pageXOffset - obj.getBoundingClientRect().x - obj.width/2)/i).toFixed(2));
    // let y = Number((-(event.pageY - window.pageYOffset - obj.getBoundingClientRect().y - obj.height/2)/i).toFixed(2));

    let x = event.clientX - left;
    let y = event.clientY - top;

    let xCalculated = (x - 150) / 130 * 5;
    let yCalculated = (-y + 150) / 130 * 5;

    this.point.x = xCalculated;
    this.point.y = yCalculated;

    this.addPoint();
    this.getPointsRecalculated(this.point.r);
  }

  drawPoint(point: Point) {
    this.graphic.drawPoint(point);
  }

  drawGraphic(r) {
    this.graphic.drawGraphic(r);
    this.getPointsRecalculated(r);
  }

  isDesktopDisplay() {
    return document.body.clientWidth >= 1122;
  }

  private error(message: string) {
    this.errorMessage = message;
    setTimeout(()=>{this.errorMessage=null}, 3000);
  }
}
